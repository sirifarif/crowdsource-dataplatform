$(document).ready(function () {
    var defaultLang = 'Odia';
    const e = $("#start-record"), t = e.parent(), a = document.querySelectorAll('input[name = "gender"]'),
        o = document.getElementById("age"), r = document.getElementById("language"),
        n = document.getElementById("mother-tongue"), i = $("#username"), l = i.next(), s = $("#tnc"),
        d = /^[6-9]\d{9}$/, c = /^\S+@\S+[\.][0-9a-z]+$/, g = $("#speaker-data"), u = g.find("#loader1,#loader2"),
        m = g.find("#speakers-wrapper"), p = g.find("#speaker-value"), h = g.find("#hours-wrapper"),
        v = g.find("#hour-value"), f = e => d.test(e) || c.test(e), k = () => {
            i.val().length > 11 ? (i.tooltip("enable"), i.tooltip("show")) : (i.tooltip("disable"), i.tooltip("hide"))
        }, y = () => {
            const e = i.val().trim();
            f(e) ? (i.addClass("is-invalid"), l.removeClass("d-none")) : (i.removeClass("is-invalid"), l.addClass("d-none")), s.trigger("change"), k()
        };
    i.tooltip({
        container: "body",
        placement: screen.availWidth > 500 ? "right" : "auto",
        trigger: "focus"
    }), k(), s.prop("checked", !1), t.tooltip({
        container: "body",
        placement: screen.availWidth > 500 ? "right" : "auto"
    });
    const b = localStorage.getItem("speakerDetails");
    if (b) {
        const e = JSON.parse(b), t = document.querySelector('input[name = "gender"][value="' + e.gender + '"]');
        t && (t.checked = !0, t.previous = !0), o.value = e.age, n.value = e.motherTongue, i.val(e.userName ? e.userName.trim().substring(0, 12) : ""), y()
    }
    a.forEach(e => {
        e.addEventListener("click", e => {
            e.target.previous && (e.target.checked = !1), e.target.previous = e.target.checked
        })
    });
    const C = e => {
        f(e) ? t.attr("data-original-title", "Please validate any error message before proceeding") : t.attr("data-original-title", "Please agree to the Terms and Conditions before proceeding")
    };
    C(i.val().trim()), s.change(function () {
        const a = i.val().trim();
        this.checked && !f(a) ? (e.removeAttr("disabled").removeClass("point-none"), t.tooltip("disable")) : (C(a), e.prop("disabled", "true").addClass("point-none"), t.tooltip("enable"))
    }), i.on("input focus", y), e.on("click", e => {
        if (s.prop("checked")) {
            const e = Array.from(a).filter(e => e.checked), t = e.length ? e[0].value : "",
                l = i.val().trim().substring(0, 12);
            if (f(l)) return;
            const s = {gender: t, age: o.value, motherTongue: n.value, userName: l, language: r.value};
            localStorage.setItem("speakerDetails", JSON.stringify(s)), location.href = "/record"
        }
    }), fetch(`/getDetails/${defaultLang}`).then(e => {
        if (e.ok)
            return e.json();
        throw Error(e.statusText || "HTTP error")
    }).then(e => {
        try {
            u.addClass("d-none");
            const t = 6 * e.find(e => 1 === e.index).count, a = Math.floor(t / 3600), o = t % 3600,
                r = Math.floor(o / 60), n = o % 60;
            v.text(`${a}h ${r}m ${n}s`), p.text(e.find(e => 0 === e.index).count), h.removeClass("d-none"), m.removeClass("d-none"), localStorage.setItem("speakersData", JSON.stringify(e))
        } catch (e) {
            console.log(e)
        }
    }).catch(e => {
        console.log(e)
    })
});

function updateLanguage(language) {
    const g = $("#speaker-data"), u = g.find("#loader1,#loader2"),
        m = g.find("#speakers-wrapper"), p = g.find("#speaker-value"), h = g.find("#hours-wrapper"),
        v = g.find("#hour-value")
    fetch(`/getDetails/${language}`).then(e => {
        if (e.ok)
            return e.json();
        throw Error(e.statusText || "HTTP error")
    }).then(e => {
        try {
            u.addClass("d-none");
            const t = 6 * e.find(e => 1 === e.index).count, a = Math.floor(t / 3600), o = t % 3600,
                r = Math.floor(o / 60), n = o % 60;
            document.getElementById('language_button').innerText = language;
            v.text(`${a}h ${r}m ${n}s`), p.text(e.find(e => 0 === e.index).count), h.removeClass("d-none"), m.removeClass("d-none"), localStorage.setItem("speakersData", JSON.stringify(e))
        } catch (e) {
            console.log(e)
        }
    }).catch(e => {
        console.log(e)
    })
}

function enableRecording() {
    const $toggleButton = $("#start_recording");
    $toggleButton.removeAttr('disabled');
}