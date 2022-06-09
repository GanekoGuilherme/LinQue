import AppError from '@shared/errors/AppError';
import Videos from '../schemas/Videos';

interface IRequestDTO {
  dataId?: string;
  pageRaw: number;
}

export default class ListVideoBySummonerService {
  async execute({ dataId, pageRaw }: IRequestDTO): Promise<any> {
    if (!dataId) {
      throw new AppError('Id não enviado.', 400);
    }

    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const videos = await Videos.find({ dataId })
      .select('_id name url dataId createdAt')
      .populate({ model: 'Lolinfos', path: 'dataId', select: 'profileIconId name' })
      .sort({ createdAt: -1 })
      .skip(page * 10)
      .limit(10);

    return videos;
  }
}
