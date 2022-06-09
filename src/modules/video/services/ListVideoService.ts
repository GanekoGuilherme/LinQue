import Videos from '../schemas/Videos';

interface IRequestDTO {
  pageRaw: number;
}

export default class ListVideoService {
  async execute({ pageRaw }: IRequestDTO): Promise<any> {
    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const videos = await Videos.find()
      .select('_id name url dataId createdAt')
      .populate({ model: 'Lolinfos', path: 'dataId', select: 'profileIconId name' })
      .sort({ createdAt: -1 })
      .skip(page * 10)
      .limit(10);

    return videos;
  }
}
