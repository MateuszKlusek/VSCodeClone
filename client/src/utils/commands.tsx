import { cmd_l, cmd_h, cmd_$, cmd_0, cmd_a } from "./VimNavigation/LeftRightMotions.js"

import { cmd_j, cmd_k, cmd_gg, cmd_G, cmd_goToLine } from "./VimNavigation/UpDownMotions.js"

import { cmd_A, cmd_dotsW } from "./movingCommands.js"
import { cmd_d$, cmd_d0 } from "./VimNavigation/DeletingText.js"

import { cmd_o, cmd_O, cmd_dd } from "./x.js"

import { cmd_B, cmd_W } from "./bw.js"
import { cmd_r } from "./r.js"
import { cmd_doubleClosingTab, cmd_doubleOpeningTab } from "./VimNavigation/ChangingText.js"


export const commands: any = {
    '^Backspace': cmd_h,



    // cmd_0 at the beginning not to change futher \\d* because when happened we break the loop 
    '^0': cmd_0,
    // standard arrows / WSAD navigation
    '^\\d*l': cmd_l,
    '^\\d*h':
        cmd_h,
    '^\\d*k': cmd_k,
    '^\\d*j': cmd_j,
    '^a': cmd_a,

    // 
    '^gg': cmd_gg,
    '^G': cmd_G,


    // replace 
    '^r.': cmd_r,





    // delete
    '^d[$]': cmd_d$,
    '^d0': cmd_d0,
    '^\\d*dd': cmd_dd,

    // 
    '^\\$': cmd_$,

    //
    '^A': cmd_A,
    // saving/exiting and so on
    '^\:wEnter': cmd_dotsW,


    //  adding empty lines
    '^\\d*o': cmd_o,
    '^\\d*O': cmd_O,



    // b/B w/W commands
    // '^B': cmd_B,
    // '^W': cmd_W,

    // indenting
    '^[>]{2}': cmd_doubleOpeningTab,
    '^[<]{2}': cmd_doubleClosingTab,

    // move to top, middle and bottom screen 



    // go to a specific line
    '^:\\d+Enter': cmd_goToLine,


    // repeats



}