import Lolinfos from '@modules/lol/schemas/Lolinfos';
import AppError from '@shared/errors/AppError';
import { apiRiotBr1 } from '@shared/infra/apis';
import { v4 as uuidv4 } from 'uuid';
import Videos from '../schemas/Videos';

interface IRequestDTO {
  summonerName: string;
  pageRaw: number;
}

export default class ListVideoBySummonerService {
  async execute({ summonerName, pageRaw }: IRequestDTO): Promise<any> {
    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const response = await apiRiotBr1
      .get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`)
      .catch((error: any) => {
        if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
          throw new AppError('Invocador não encontrado.', 404);
        }
        throw new AppError('Falha na comunicação com API Riot.', 500);
      });

    const summoner = await Lolinfos.findOneAndUpdate(
      { puuid: response.data.puuid },
      {
        $setOnInsert: { _id: uuidv4() },

        $set: {
          puuid: response.data.puuid,
          summonerId: response.data.id,
          name: response.data.name,
          profileIconId: response.data.profileIconId,
          revisionDate: response.data.revisionDate,
          summonerLevel: response.data.summonerLevel,
        },
      },
      { upsert: true, new: true },
    );

    const videos = await Videos.find({ dataId: summoner._id })
      .select('_id name url')
      .sort({ createdAt: -1 })
      .skip(page * 10)
      .limit(10);

    return videos;
  }
}
