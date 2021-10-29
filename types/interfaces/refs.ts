export default interface Refs {
  $refs: {
    form: any; // на самом деле не any, а интерфейс компонента, поддерживающий нужные методы
  }
}