import Lolinfos from '../schemas/Lolinfos';

class ShowResumeSummonerService {
  async execute(dataId: string): Promise<any> {
    const data = await Lolinfos.findOne({ _id: dataId }).select('statusMatchesUpdate');

    return { statusMatchesUpdate: data?.statusMatchesUpdate || 'SEM_REQUISIÇÃO' };
  }
}

export default ShowResumeSummonerService;
