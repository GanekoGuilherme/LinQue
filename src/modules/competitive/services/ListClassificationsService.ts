import CompetitiveClassifications from '../schemas/CompetitiveClassifications';

class ListClassificationsService {
  async execute(name: string): Promise<any> {
    return await CompetitiveClassifications.findOne({ name });
  }
}

export default ListClassificationsService;
