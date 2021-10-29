export default {
  loggedIn: { type: 'success', message: 'Ви ввійшли в систему' },
  registered: { type: 'success', message: 'Ви щойно зареєструвались' },
  noUser: { type: 'error', message: 'Спершу ввійдіть в систему' },
  hasUser: { type: 'info', message: 'Ви вже ввійшли в систему, якщо треба вийдіть' },
  leave: { type: 'info', message: 'Ви вийшли із системи' },
  not_same_passwords: { type: 'error', message: 'Паролі не співпадають' },
  added_to_cart: { type: 'success', message: 'Добавлено до корзини' },
  chenged_in_cart: { type: 'success', message: 'Зміни внесено' },
  ordered: { type: 'success', message: 'Ваш заказ фальшивка' },
  account_updated: { type: 'success', message: 'Аккаунт відредаговано' }
}