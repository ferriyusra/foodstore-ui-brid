import { func } from "prop-types";

export function formatRupiah(number) {

    // mengecek apakah number bertipe bukan number? jika bukan number kita
    // hentikan operasi dan kembalikan string kosong ''
    if (isNaN(parseInt(number))) return '';

    return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 2, style: 'currency', currency: 'IDR' }).format(number)
}