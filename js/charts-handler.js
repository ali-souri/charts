$("document").ready(function() {
    var hash = location.hash;
    if (hash.length) {
        $.post("charts.php",
                {hash: hash},
        function(data) {
            $.each(data, function(index, object) {
                if (object.status == "true") {
                    $("#chart-iframe").attr("src", object.address, editorHandle(object.html));
                    $("#chart-name").text(hash.substring(1));
                } else {
                    $("#chart-iframe").contents().find('html').html("<h1 style='text-align: center;'>آدرس اشتباه میباشد.</h1>");
                }
            });
        });
    } else {
        $("#chart-iframe").contents().find('html').html("<h1 style='text-align: center;'>بخش مربوط به نمودار خالی میباشد.</h1>");
    }
    $("#chart-view").click(function() {
        var butten = $(this);
        $("#code-editor-container").fadeToggle(200, function() {
            buttenToggle(butten);
        });
    });
    $("#run").click(function() {
        var butten = $(this);
        var editor = ace.edit("editor");
        var value = editor.getValue().replace("../", "http://localhost/charts/").replace("../", "http://localhost/charts/");
        $("#chart-iframe").attr("src", "data:text/html;charset=utf-8," + escape(value));
    });
    $(".theme-button").tooltip({
        animation: true,
        trigger: "hover",
        placement: "bottom"
    });
    $(".theme-button").click(function() {
        var theme_name = $(this).data("theme");
        var editor = ace.edit("editor");
        var chalk_style = "@import url(http://fonts.googleapis.com/css?family=Covered+By+Your+Grace);#chartdiv {background: #282828 url(\'http://www.amcharts.com/lib/3/patterns/chalk/bg.jpg') !important;color:#fff !important;width:100% !important;font-size:11px !important;}";
        var dark_style = "#chartdiv {background: #3f3f4f !important;color:#FFFFFFf !important;}";
        var default_style = "#chartdiv {width:100%;font-size: 11px;}";
        var none_style = "editable-style";
        $(".theme-img").removeClass("active-theme-bottun");
        $(this).children(".theme-img").addClass("active-theme-bottun");
        if (theme_name === "default") {
            editor.find(chalk_style);
            editor.replace(default_style);
            editor.find(dark_style);
            editor.replace(default_style);
            editor.find(none_style);
            editor.replace(default_style);
            editor.find('chalk');
            editor.replaceAll(theme_name);
            editor.find('patterns');
            editor.replaceAll(theme_name);
            editor.find('dark');
            editor.replaceAll(theme_name);
            editor.find('light');
            editor.replaceAll(theme_name);
            editor.find('\"#0f0f0f\"');
            editor.replaceAll('\"#FFFFFF\"');
        }else if (theme_name === "chalk") {
            editor.find('default');
            editor.replaceAll(theme_name);
            editor.find('patterns');
            editor.replaceAll(theme_name);
            editor.find('dark');
            editor.replaceAll(theme_name);
            editor.find('light');
            editor.replaceAll(theme_name);
            editor.find(default_style);
            editor.replace(chalk_style);
            editor.find(dark_style);
            editor.replace(chalk_style);
            editor.find(none_style);
            editor.replace(chalk_style);
            editor.find('\"#0f0f0f\"');
            editor.replaceAll('\"#FFFFFF\"');
        }else if (theme_name === "patterns") {
            editor.find(chalk_style);
            editor.replace(default_style);
            editor.find(dark_style);
            editor.replace(default_style);
            editor.find(none_style);
            editor.replace(default_style);
            editor.find('default');
            editor.replaceAll(theme_name);
            editor.find('chalk');
            editor.replaceAll(theme_name);
            editor.find('dark');
            editor.replaceAll(theme_name);
            editor.find('light');
            editor.replaceAll(theme_name);
            editor.find('\"#FFFFFF\"');
            editor.replaceAll('\"#0f0f0f\"');
        }else if (theme_name === "dark") {
            editor.find(chalk_style);
            editor.replace(dark_style);
            editor.find(default_style);
            editor.replace(dark_style);
            editor.find(none_style);
            editor.replace(dark_style);
            editor.find('default');
            editor.replaceAll(theme_name);
            editor.find('chalk');
            editor.replaceAll(theme_name);
            editor.find('patterns');
            editor.replaceAll(theme_name);
            editor.find('light');
            editor.replaceAll(theme_name);
            editor.find('\"#0f0f0f\"');
            editor.replaceAll('\"#FFFFFF\"');
        }else if (theme_name === "light") {
            editor.find(chalk_style);
            editor.replace(default_style);
            editor.find(dark_style);
            editor.replace(default_style);
            editor.find(none_style);
            editor.replace(default_style);
            editor.find('default');
            editor.replaceAll(theme_name);
            editor.find('chalk');
            editor.replaceAll(theme_name);
            editor.find('patterns');
            editor.replaceAll(theme_name);
            editor.find('dark');
            editor.replaceAll(theme_name);
            editor.find('\"#0f0f0f\"');
            editor.replaceAll('\"#FFFFFF\"');
        }
    });
    function editorHandle(html) {
        var editor = ace.edit("editor");
        // editor.setTheme("ace/theme/twilight");
        editor.getSession().setMode("ace/mode/html");
        editor.setValue(html);
        $("#chart-view").removeAttr("disabled");
    }
    ;
    function buttenToggle(butten) {
        if (butten.hasClass("closed")) {
            butten.removeClass("closed").addClass("opened closebutton");
            butten.text("X");
        } else if (butten.hasClass("opened")) {
            butten.removeClass("opened closebutton").addClass("closed");
            butten.text("نمایش کد");
        }
    }
    ;
    function runHandle() {
        var editor = ace.edit("editor");
        $("#chart-iframe").attr('src', "");
    }
    ;
});