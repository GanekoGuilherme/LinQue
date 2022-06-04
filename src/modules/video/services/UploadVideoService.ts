import { v4 as uuidv4 } from 'uuid';
import Videos from '../schemas/Videos';

interface IRequestDTO {
  name: string;
  size: number;
  key: string;
  url: string;
}

export default class UploadVideoService {
  async execute({ name, size, key, url }: IRequestDTO): Promise<any> {
    const video = await Videos.create({ _id: uuidv4(), name, size, key, url });

    return video;
  }
}
