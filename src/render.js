const minim_btn = document.getElementById("minimalize");
const maxim_btn = document.getElementById("maximize");
const close_btn = document.getElementById("close");
const real_file_btn = document.getElementById("my-file-real");
const fake_file_btn = document.getElementById("my-file-button");
const fake_file_txt = document.getElementById("my-file-text");

minim_btn.addEventListener("click", function() {
    app.window.minimize();
    console.log("minimized");
})

maxim_btn.addEventListener("click", function() {
    app.window.maximize();
    console.log("maximized!");
})

close_btn.addEventListener("click", function() {
    app.window.close();
})

fake_file_btn.addEventListener("click", function() {
    real_file_btn.click();
})

real_file_btn.addEventListener("change", function() {
    if (real_file_btn.value) {
        fake_file_txt.innerHTML = real_file_btn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        
    } else {
        fake_file_txt.innerHTML = "No file chosen...";
    }
})

const lang = {
    js: {
        equa: /(\b=\b)/g,
        quot: /((&#39;.*?&#39;)|(&#34;.*?&#34;)|(".*?(?<!\\)")|('.*?(?<!\\)')|`)/g,
        comm: /((\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*))/g,
        logi: /(%=|%|\-|\+|\*|&amp;{1,2}|\|{1,2}|&lt;=|&gt;=|&lt;|&gt;|!={1,2}|={2,3})/g,
        numb: /(\d+(\.\d+)?(e\d+)?)/g,
        func: /(?<=^|\s*)(async|await|console|alert|Math|Object|Array|String|class(?!\s*\=)|function)(?=\b)/g,
        decl: /(?<=^|\s*)(var|let|const)/g,
        pare: /(\(|\))/g,
        squa: /(\[|\])/g,
        curl: /(\{|\})/g,
    },
    html: {
        tags: /(?<=&lt;(?:\/)?)(\w+)(?=\s|\&gt;)/g,
        // Props order matters! Here I rely on "tags"
        // being already applied in the previous iteration
        angl: /(&lt;\/?|&gt;)/g,
        attr: /((?<=<i class=html_tags>\w+<\/i>)[^<]+)/g,
    },
    py: {
        kwrd: /(?<=^|\s*)(await|else|import|pass|break|except|in|class(?!\s*\=)|raise|finally|îs|return|and|continue|for|lambda|try|as|def|from|nonlocal|while|assert|del|global|not|with|async|elif|if|or|yield)(?=\b)/g,
        bool: /(?<=^|\s*)(True|False)/g,
        none: /(?<=^|\s*)(None)/g,
    },
    java: {
        kwrd: /(?<=^|\s*)(assert|boolean|break|case|catch|class(?!\s*\=)|continue|default|do|else|enum|extends|finally|for|goto|if|implements|import|instanceof|interface|native|new|package|return|strictfp|super|switch|synchronized|throw|throws|transient|try|void|volatile|while)(?=\b)/g,
        decl: /(?<=^|\s*)(byte|char|const|double|float|int|long|short)/g,
        mdfr: /(?<=^|\s*)(final|abstract|private|protected|public|static|)/g,
        thsk: /(?<=^|\s*)(this)/g,
        bool: /(?<=^|\s*)(true|false)/g,
        none: /(?<=^|\s*)(null)/g,
    },
    topg: {
        kwrd: /(?<=^|\s*)(def|func|cl(?!\s*\=)|func|break|for|in|return|goto|try|catch|use)/g,
        decl: /(?<=^|\s*)(byte|char|const|int|float|long|short|unsigned)/g,
        fncs: /(?<=^|\s*)(pln)/g,
        parn: /(?<=^|\s*)(\(|\))/g,
    }
};
  
const highlight = el => {
    const dataLang = el.dataset.lang; // Detect "js", "html", "py", "bash", ...
    const langObj = lang[dataLang]; // Extract object from lang regexes dictionary
    let html = el.innerHTML;
    Object.keys(langObj).forEach(function(key) {
      html = html.replace(langObj[key], `<i class=${dataLang}_${key}>$1</i>`);
    });
    el.previousElementSibling.innerHTML = html; // Finally, show highlights!
};
  
const editors = document.querySelectorAll("#editor");
editors.forEach(el => {
    el.contentEditable = true;
    el.spellcheck = false;
    el.autocorrect = "off";
    el.autocapitalize = "off";
    el.addEventListener("input", () => highlight(el));
    highlight(el); // Init!
});