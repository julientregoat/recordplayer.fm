pub trait DAO {
  fn create() -> Self;
  fn get_all() -> Vec<Self>;
  fn get(id: i32) -> Self;
  fn update(id: i32) -> Self;
  fn delete(id: i32);
}