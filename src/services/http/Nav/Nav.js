import { CATEGORIES_AND_CURRENCIES } from './queries'
import requestHandler from "../requestHandler"

export const findCategoriesAndCurrencies = () => requestHandler(CATEGORIES_AND_CURRENCIES)