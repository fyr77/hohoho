function ho() {
    ho_to_bf();
    interpret();
}

function bf() {
    bf_to_ho();
    interpret();
}

function txt() {
    tobf();
}

function ho_to_bf() {
    var isSimpleHoho = document.getElementById("simple_hoho").checked;
    var hofield = document.getElementById("hohoho_code");
    var bffield = document.getElementById("brainfuck_code");
    var hocode = hofield.value;
    hocode = hocode.replace(/[^a-zA-Z]/g, ""); //Remove special characters

    if (isSimpleHoho) {
        hocode = hocode.replace(/(\w{4})/g, '$1 ').replace(/(^\s+|\s+$)/, ''); //Space after each set of 4 characters
        var bfcode = hocode.replace(/hoHo/g, "+");
        bfcode = bfcode.replace(/Hoho/g, "-");
        bfcode = bfcode.replace(/HoHo/g, ">");
        bfcode = bfcode.replace(/hoho/g, ".");
        bfcode = bfcode.replace(/[\s]/g, ""); //Remove whitespaces
    } else {
        hocode = hocode.replace(/(\w{6})/g, '$1 ').replace(/(^\s+|\s+$)/, ''); //Space after each set of 6 characters
        var bfcode = hocode.replace(/HoHoHo/g, "+");
        bfcode = bfcode.replace(/hohoho/g, "-");
        bfcode = bfcode.replace(/HoHoho/g, ">");
        bfcode = bfcode.replace(/hoHoHo/g, "<");
        bfcode = bfcode.replace(/Hohoho/g, "[");
        bfcode = bfcode.replace(/hohoHo/g, "]");
        bfcode = bfcode.replace(/hoHoho/g, ".");
        bfcode = bfcode.replace(/HohoHo/g, ",");
        bfcode = bfcode.replace(/[\s]/g, ""); //Remove whitespaces
    }
    bffield.value = bfcode;
}

function bf_to_ho() {
    var isSimpleHoho = document.getElementById("simple_hoho").checked;
    var hofield = document.getElementById("hohoho_code");
    var bffield = document.getElementById("brainfuck_code");
    var bfcode = bffield.value;
    bfcode = bfcode.replace(/[a-zA-Z ]/g, ""); //Remove nonspecial characters

    if (isSimpleHoho) {
        bfcode = bfcode.replace(/[\<\[\]\,]/g, ""); //Remove unsupported characters
        var hocode = bfcode.replace(/\+/g, "hoHo");
        hocode = hocode.replace(/\-/g, "Hoho");
        hocode = hocode.replace(/\>/g, "HoHo");
        hocode = hocode.replace(/\./g, "hoho");
        hocode = hocode.replace(/(H[oOh]*)/g, '$1! ').replace(/(^\s+|\s+$)/, ''); //Group into Hohoho groups starting with capital letter
    } else {
        var hocode = bfcode.replace(/\+/g, "HoHoHo");
        hocode = hocode.replace(/\-/g, "hohoho");
        hocode = hocode.replace(/\>/g, "HoHoho");
        hocode = hocode.replace(/\</g, "hoHoHo");
        hocode = hocode.replace(/\[/g, "Hohoho");
        hocode = hocode.replace(/\]/g, "hohoHo");
        hocode = hocode.replace(/\./g, "hoHoho");
        hocode = hocode.replace(/\,/g, "HohoHo");
        hocode = hocode.replace(/(H[oOh]*)/g, '$1! ').replace(/(^\s+|\s+$)/, ''); //Group into Hohoho groups starting with capital letter
    }
    hofield.value = hocode;
}

function interpret() {
    const instr = document.getElementById("brainfuck_code").value.replace(/\+/g, "%2B"); //necessary for encoding

    const options = {
        method: 'POST',
        body: `func=interpret&instr=${instr}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch('/api/api.php', options)
        .then(res => res.text())
        .then(res => (document.getElementById("text_code").value = res))
        .catch(err => console.error(err));
}

function tobf() {
    const options = {
        method: 'POST',
        body: `func=tobf&instr=${document.getElementById("text_code").value}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    let promise = fetch('/api/api.php', options)
        .then(res => res.text())
        .then(res => (document.getElementById("brainfuck_code").value = res))
        .catch(err => console.error(err));
    promise.then(
        function (value) {
            bf_to_ho();
        },
    );
}
