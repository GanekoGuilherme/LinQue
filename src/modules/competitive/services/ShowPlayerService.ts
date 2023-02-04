import Players from "../schemas/Players";

class ShowPlayerService {
  async execute(name: string): Promise<any> {
    return await Players.findOne({ name });
  }
}

export default ShowPlayerService;
