export class CategoryInfoDao {
  public categoryId: number;
  public title: string;
  public description: string;

  constructor(title: string, description: string, categoryId: number) {
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
  }
}
