import Matches from '../schemas/Matches';

class ListMatchesService2 {
  async execute(summonerName: string): Promise<any> {
    try {
      const matches = await Matches.find({ 'info.participants.summonerName': summonerName })
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

export default ListMatchesService2;
