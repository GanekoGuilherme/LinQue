import CompetitiveClassifications from "../schemas/CompetitiveClassifications";
import Players from "../schemas/Players";

class ShowResumeService {
  async execute(tournament: string, team: string): Promise<any> {
    const classifications = await CompetitiveClassifications.findOne({
      name: tournament,
    });
    const players = await Players.find({ team });

    return { classifications, players };
  }
}

export default ShowResumeService;
