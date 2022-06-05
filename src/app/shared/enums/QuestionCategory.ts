export class QuestionCategory {

  public static readonly PHOTOGRAPHY = new QuestionCategory(1, 'photography', 'Фотография');
  public static readonly CARS = new QuestionCategory(2, 'cars', 'Автомобили');
  public static readonly CODING = new QuestionCategory(3, 'coding', 'Программирование');
  public static readonly UNKNOWN = new QuestionCategory(4, 'unknown', '');

  id: number;
  name: string;
  title: string;

  constructor(id: number, name: string, title: string) {
    this.id = id;
    this.name = name;
    this.title = title;
  }

  public static values() {
    return [
      QuestionCategory.PHOTOGRAPHY, QuestionCategory.CARS, QuestionCategory.CODING
    ]
  }

  public static findByName(name: string): QuestionCategory {
    return QuestionCategory.values().find(category => category.name === name) || QuestionCategory.UNKNOWN;
  }

}
