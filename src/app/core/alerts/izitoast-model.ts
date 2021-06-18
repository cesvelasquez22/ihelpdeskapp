//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: D E F A U L T   M O D E L S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//

export const IIzitoastSuccessDefault = {
    id: 'exito',
    title: '¡Éxito!',
    message: '',
    messageColor: 'white',
    iconColor: 'white',
    titleColor: 'white',
    backgroundColor: 'rgba(0, 153, 0, 1)',
    theme: 'light',
    progressBar: false,
    position: 'topCenter',
    timeout: 2000,
    displayMode: 2
};

export const IIzitoasInfoDefault = {
    id: 'advertencia',
    title: '¡Advertencia!',
    message: '',
    messageColor: 'white',
    color: 'white',
    iconColor: 'white',
    titleColor: 'white',
    backgroundColor: 'rgba(173, 0, 0, 1)',
    theme: 'light',
    progressBar: false,
    position: 'topCenter',
    displayMode: 2,
    timeout: 3000,
};

export const IIzitoastErrorDefault = {
    id: 'error',
    title: '¡Error!',
    message: '',
    messageColor: 'white',
    titleColor: 'white',
    backgroundColor: 'rgba(173, 0, 0, 1)',
    theme: 'light',
    progressBar: false,
    position: 'topCenter',
    displayMode: 2,
    timeout: 3000,
};

//
// ────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: C U S T O M I Z A B L E   M O D E L S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//

export interface IzitoastAlert {
    id: string;
    title: string;
    message: string;
    messageColor: string;
    titleColor: string;
    backgroundColor: string;
    theme: string;
    progressBar: boolean;
    position: string;
    displayMode: number;
    timeout: number;
}


