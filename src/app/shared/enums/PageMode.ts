export class PageMode {

  public static readonly COMPETITION = new PageMode(1, 'test-competition', 'Прохождение теста');
  public static readonly VIEW_TEST = new PageMode(2, 'test-view', 'Просмотр теста');
  public static readonly UNKNOWN = new PageMode(3, 'unknown', '');

  id: number;
  name: string;
  title: string;

  constructor(id: number, name: string, title: string) {
    this.id = id;
    this.name = name;
    this.title = title;
  }

  static values() {
    return [
      PageMode.COMPETITION, PageMode.VIEW_TEST
    ]
  }

  static findByName(name: string): PageMode {
    return PageMode.values().find(mode => mode.name === name) || PageMode.UNKNOWN;
  }
}
