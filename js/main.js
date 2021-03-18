const form = [
    {
        nazev: "a",
        html: '<div class="form-group row"><label for="strana_a" class="col-sm-3 col-form-label">Strana a</label><div class="col-sm-6"><input type="number" min="0" class="form-control" name="strana_a" id="strana_a"placeholder="Zadejte délku strany a"></div></div>'
    },
    {
        nazev: "b",
        html: '<div class="form-group row"><label for="strana_b" class="col-sm-3 col-form-label">Strana b</label><div class="col-sm-6"><input type="number" min="0" class="form-control" name="strana_b" id="strana_b"placeholder="Zadejte délku strany b"></div></div>'
    },
    {
        nazev: "c",
        html: '<div class="form-group row"><label for="strana_c" class="col-sm-3 col-form-label">Strana c</label><div class="col-sm-6"><input type="number" min="0" class="form-control" name="strana_c" id="strana_c"placeholder="Zadejte délku strany c"></div></div>'
    },
    {
        nazev: "v",
        html: '<div class="form-group row"><label for="vyska" class="col-sm-3 col-form-label">Výška</label><div class="col-sm-6"><input type="number" min="0" class="form-control" name="vyska" id="vyska"placeholder="Zadejte délku výšky"></div></div>'
    },
    {
        nazev: "r",
        html: '<div class="form-group row"><label for="polomer" class="col-sm-3 col-form-label">Poloměr</label><div class="col-sm-6"><input type="number" min="0" class="form-control" name="polomer" id="polomer"placeholder="Zadejte poloměr"></div></div>'
    }
]

const tvary = [
    { typ: "ctverec", vstupy: ["a"], obsah: data => $(data).attr("a") ** 2, obvod: data => 4 * $(data).attr("a") },
    { typ: "obdelnik", vstupy: ["a", "b"], obsah: data => $(data).attr("a") * $(data).attr("b"), obvod: data => 2 * $(data).attr("a") + 2 * $(data).attr("b") },
    { typ: "trojuhelnik", vstupy: ["a", "b", "c", "v"], obsah: data => $(data).attr("a") * $(data).attr("v") / 2, obvod: data => $(data).attr("a") * 1 + $(data).attr("b") * 1 + $(data).attr("c") * 1 },
    { typ: "kruh", vstupy: ["r"], obsah: data => Math.PI * $(data).attr("r") ** 2, obvod: data => 2 * Math.PI * $(data).attr("r") },
];

console.log(tvary.find(obj => obj.typ === "ctverec"))

function findJSONObject(data, attr, value) {
    var obj;
    data.forEach(function (element) {
        if (element[attr] === value) {
            obj = element;
        }
    });
    return obj;
}

function load(hodnoty) {
    hodnoty.a = $("#strana_a").val();
    hodnoty.b = $("#strana_b").val();
    hodnoty.c = $("#strana_c").val();
    hodnoty.v = $("#vyska").val();
    hodnoty.r = $("#polomer").val();
}

function calc(tvar, hodnoty) {
    var obvod = 0;
    var obsah = 0;
    obvod = parseFloat(tvar.obvod(hodnoty).toFixed(4))
    obsah = parseFloat(tvar.obsah(hodnoty).toFixed(4))
    $("#obvod").html(obvod)
    $("#obsah").html(obsah)
}

function inputs(tvar) {
    $("form").children().not(":first-child").remove()
    tvar.vstupy.forEach((element) => {
        var obj = findJSONObject(form, 'nazev', element);
        $("form").append(obj.html)
    })
}

$(() => {
    let tvar = null;
    let hodnoty = {
        a: 0,
        b: 0,
        c: 0,
        v: 0,
        r: 0
    };

    $("form").submit(function () {
        return false;
    });

    $("form").on('change', () => {
        var nazev = $("#shape option:selected").val()
        tvar = tvary.find(obj => obj.typ === nazev)

        load(hodnoty);
        calc(tvar, hodnoty);
    });

    $("#shape").on('change', () => {
        var nazev = $("#shape option:selected").val()
        var tvar = tvary.find(obj => obj.typ === nazev)
        $("#rem").remove()
        inputs(tvar)
    });

});