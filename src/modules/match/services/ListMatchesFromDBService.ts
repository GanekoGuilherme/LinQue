import Matches from '../schemas/Matches';

class ListMatchesFromDBService {
  async execute(summonerName: string): Promise<any> {
    try {
      const matches = await Matches.find({
        'info.participants.summonerName': { $regex: new RegExp('^' + summonerName + '$', 'i') },
      })
        .sort({
          'info.gameEndTimestamp': -1,
        })
        .limit(10);

      return matches;
    } catch (error: any) {
      if (error?.response?.data) console.log(error?.response?.data);
      else console.log(error);
    }
  }
}

export default ListMatchesFromDBService;
