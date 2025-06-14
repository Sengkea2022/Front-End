import { useI18n } from "#imports";
export function translate(key: string) {
    const { t } = useI18n();
    return t(key);
}