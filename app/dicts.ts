import "server-only";

import enUS from "../i18n/en-US.json";
import ja from "../i18n/ja.json";

import i18nDictionaries from "../i18n/interface";

interface DictionaryLoaderMap {
  [key: string]: () => i18nDictionaries;
}

const dictionaries: DictionaryLoaderMap = {
  enUS: () => enUS,
  ja: () => ja,
};

export const getDictionary = async (localeOriginal: string) => {
  const locale = localeOriginal.replace(/-/g, "");
  console.log(`[dicts.ts] Requested lang: ${locale} (Originally ${localeOriginal})`);
  if (!dictionaries[locale]) {
    // localeに対応する関数が存在しない場合の処理
    throw new Error(`No dictionary available for locale: ${locale} (Originally ${localeOriginal})`);
  }
  // 存在する場合はその関数を実行
  return dictionaries[locale]();
};
