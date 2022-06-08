import { Request, Response } from 'express';
import { IFileDTO } from '../dtos/FileDTO';
import ListVideoBySummonerService from '../services/ListVideoBySummonerService';
import ListVideoService from '../services/ListVideoService';
import UploadVideoService from '../services/UploadVideoService';

class VideoController {
  public async list(request: Request, response: Response) {
    const { page } = request.query;

    const listVideoService = new ListVideoService();
    const result = await listVideoService.execute({ pageRaw: Number(page) });

    return response.json({ items: result });
  }

  public async listBySummoner(request: Request, response: Response) {
    const { summonerName } = request.params;
    const { page } = request.query;

    const listVideoBySummonerService = new ListVideoBySummonerService();
    const result = await listVideoBySummonerService.execute({ summonerName, pageRaw: Number(page) });

    return response.json({ items: result });
  }

  public async upload(request: Request, response: Response) {
    const { originalname: name, size, key, location: url = '' } = request.file as unknown as IFileDTO;
    const dataId = request.user.dataId;

    const uploadVideoService = new UploadVideoService();
    const result = await uploadVideoService.execute({ name, size, key, url, dataId });

    return response.json(result);
  }
}

export default VideoController;
