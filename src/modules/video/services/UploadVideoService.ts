import AppError from '@shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import Videos from '../schemas/Videos';

interface IRequestDTO {
  name: string;
  size: number;
  key: string;
  url: string;
  dataId?: string;
}

export default class UploadVideoService {
  async execute({ name, size, key, url, dataId }: IRequestDTO): Promise<any> {
    if (!dataId) {
      throw new AppError('DataId não encontrado.', 400);
    }

    const video = await Videos.create({ _id: uuidv4(), name, size, key, url, dataId });

    return video;
  }
}
