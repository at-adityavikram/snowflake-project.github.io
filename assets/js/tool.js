document.addEventListener("DOMContentLoaded", function(){
    let passwordArea = document.getElementById("password-input");
    let timeToCrack = document.getElementById("demo-time");

    let passwordType = 26; //base, lowercase
    let efficiencyConst = .99; //99% of the processor's resources are dedicated to cracking
    let cores = 16; 
    let clock = 5;
    // i9 9900k
    let encryptionConst = 1.3350498701323122e-06;
    let effectiveCores = 1/((1 - efficiencyConst) + (efficiencyConst / cores));
    let gigaFLOPS = clock * effectiveCores;
    let kps = gigaFLOPS / encryptionConst;
    console.log(kps);

    function GetType(str)
    {
        let unique = 0;
        let n = str.length;
        let seen = [];
        let type = 0;
        let symbols = false, capitals = false, digits = false;

        for(let i = 0; i < n; i++)
        {
            let cCode = str[i].charCodeAt();
            if ((cCode >= 33 && cCode <= 47) || (cCode >= 58 && cCode <= 64)) symbols = true;
            if (cCode >= 65 && cCode <= 90) capitals = true;
            if (cCode >= 48 && cCode <= 57) digits = true;

            if(seen.includes(str[i])) continue;
            unique++;
            seen.push(str[i])
        }
        type = unique;
        type += 4;
        if(symbols) type += 1.5;
        if(capitals) type += 1.5;
        if(digits) type += 1;

        if(n > 4) type = Math.ceil(type * 1.05);
        return type;
    }

    function CalculateTime()
    {
        let passwordType = GetType(passwordArea.value);
        let combinations = Math.pow(passwordArea.value.length, passwordType);
        let seconds = combinations/kps;
        let years = 0, months = 0, days = 0, hours = 0, minutes = 0;
        
        //ugly but i didnt have much time sorry, also the conversions from seconds to all the other units aren't 100% accurate, but they're accurate enough, ig.
        if (seconds > 3.154e+7)
        {
            years = Math.floor(seconds / 3.154e+7);
            seconds = seconds % 3.154e+7;
        }

        if (seconds > 2.628e+6) {
            months = Math.floor(seconds / 2.628e+6);
            seconds = seconds % 2.628e+6;
        }

        if (seconds > 86399.90531424) {
            days = Math.floor(seconds / 86399.90531424);
            seconds = seconds % 86399.90531424;
        }

        if (seconds > 3600) {
            hours = Math.floor(seconds / 3600);
            seconds = seconds % 3600;
        }

        if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
        }

        seconds = Math.ceil(seconds);

        text = `${years > 0 ? `${years} Years` : ''} ${months > 0 ? `${months} Months` : ''} ${days > 0 ? `${days} Days` : ''} ${hours > 0 ? `${hours} Hours` : ''} ${minutes > 0 ? `${minutes} minutes` : ''} ${seconds > 0 ? `${seconds} seconds` : ''}`

        timeToCrack.innerHTML = text;
    }

    passwordArea.addEventListener("keyup", CalculateTime);
    passwordArea.addEventListener("select", CalculateTime);
    passwordArea.addEventListener("paste", CalculateTime);
    passwordArea.addEventListener("change", CalculateTime);
    passwordArea.addEventListener("cut", CalculateTime);
});