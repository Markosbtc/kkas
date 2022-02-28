export class Constants {

    // match email, which is formated as such
    // <at least one nonspace character>@<at least one nonspace character>.<at least two nonspace characters>
    static EMAIL_PATTERN = '^[a-zA-z0-9][^\\s]+@[^\\s]+\\.[^\\s]{2,3}';

    // match string with length of >8, must contain at least one upper case letter and one number
    static PASSWORD_PATTERN =
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9 \\\!"’#$%&()*+,-.\\/:;<=>?@[\\]^_`{|}~áÁéÉíÍóÓöÖőŐúÚüÜűŰ]{8,}';

    // match phone number formated either as +36<nine numbers> or +381<nine numbers>
    static PHONE_PATTERN = '^((\\+36){1}[0-9]{9})$|^((\\+381){1}[0-9]{8,9})$';

}
