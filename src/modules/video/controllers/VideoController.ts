import { Request, Response } from 'express';
import { IFileDTO } from '../dtos/FileDTO';
import UploadVideoService from '../services/UploadVideoService';

class VideoController {
  public async upload(request: Request, response: Response) {
    const { originalname: name, size, key, location: url = '' } = request.file as unknown as IFileDTO;

    const uploadVideoService = new UploadVideoService();
    const result = await uploadVideoService.execute({ name, size, key, url });

    return response.json(result);
  }
}

export default VideoController;
