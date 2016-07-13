$(function () {

    $('.scrollUp, .scrollDown').bind('click', function () {

        var actualStep = parseInt((s.getScrollTop()) / screenStep);
        var nextStep = ($(this).is('.scrollUp')) ? actualStep - 1 : actualStep + 1;

        if (actualStep == 6 && nextStep == 7) nextStep = 8;
        else if (actualStep >= 8 && nextStep == 7) nextStep = 6;

        var finalScroll = (screenStep * nextStep) + ((actualStep==1 && nextStep==0)?0:(screenStep / 5))

        $('html, body').stop(true,false).animate({ 'scrollTop': finalScroll}, 2000);

    })

    $(document).keydown(function (e) {
        e.preventDefault();
        if (e.keyCode == 38) $('.scrollUp').trigger('click');
        else if (e.keyCode == 40) $('.scrollDown').trigger('click');
    });

    var s = skrollr.init({
        constants: {

            p750p: function () { return 7.5 * screenStep },
            p710p: function () { return 7.25 * screenStep },
            p700p: function () { return 7 * screenStep },
            p650p: function () { return 6.5 * screenStep },
            p610p: function () { return 6.25 * screenStep },
            p600p: function () { return 6 * screenStep },
            p550p: function () { return 5.5 * screenStep },
            p510p: function () { return 5.25 * screenStep },
            p500p: function () { return 5 * screenStep },
            p450p: function () { return 4.5 * screenStep },
            p410p: function () { return 4.25 * screenStep },
            p400p: function () { return 4 * screenStep },
            p350p: function () { return 3.5 * screenStep },
            p310p: function () { return 3.25 * screenStep },
            p300p: function () { return 3 * screenStep },
            p250p: function () { return 2.5 * screenStep },
            p210p: function () { return 2.25 * screenStep },
            p200p: function () { return 2 * screenStep },
            p150p: function () { return 1.5 * screenStep },
            p110p: function () { return 1.25 * screenStep },
            p100p: function () { return 1 * screenStep },
            p60p: function () { return .6 * screenStep },
            p40p: function () { return .3 * screenStep },
            p20p: function () { return .2 * screenStep },


            /* line */
            svgend: function () { return svgH },
            a4750: function () { return ((4750 / 5442) * svgH) - lineOffset },
            a4000: function () { return ((4000 / 5442) * svgH) - lineOffset },
            a3000: function () { return ((3000 / 5442) * svgH) - lineOffset },
            a2000: function () { return ((2000 / 5442) * svgH) - lineOffset },
            a1800: function () { return ((1800 / 5442) * svgH) - lineOffset },
            a1300: function () { return ((1300 / 5442) * svgH) - lineOffset },
            a250: function () { return ((250 / 5442) * svgH) - lineOffset },

            /* leaves */
            l4500: function () { return ((4500 / 5442) * svgH) - lineOffset },
            l4300: function () { return ((4300 / 5442) * svgH) - lineOffset },
            l3650: function () { return ((3650 / 5442) * svgH) - lineOffset },
            l3500: function () { return ((3500 / 5442) * svgH) - lineOffset },
            l3100: function () { return ((3100 / 5442) * svgH) - lineOffset },
            l2900: function () { return ((2900 / 5442) * svgH) - lineOffset },
            l2600: function () { return ((2600 / 5442) * svgH) - lineOffset },
            l2400: function () { return ((2400 / 5442) * svgH) - lineOffset },
            l1900: function () { return ((1900 / 5442) * svgH) - lineOffset },
            l1700: function () { return ((1700 / 5442) * svgH) - lineOffset },
            l1100: function () { return ((1100 / 5442) * svgH) - lineOffset },
            l900: function () { return ((900 / 5442) * svgH) - lineOffset },
            
        },
        forceHeight: false
    });


    var screenStep = 0,
        totalSteps = 9,
        svgH = svgW = 0,
        lineOffset = -100, //300,
        svg = $('#line'),
        WHratio = 1600 / 1115,
        SVGratio = 5500 / 1600;


    if (s.isMobile()) {
        $('#line').hide();
        svg = $('<img id="imgLine" src="' + basePath + 'Content/Images/line_mobile.png">').appendTo($('#skrollr-body'));
    }



    function computeSize() {

        // reset
        svg.attr('width', '100%');
        svg.attr('height', '100%');

        // let's add another screen at the top to have a bit of margin when displaying copy panels
        // AND adjust ratio

        wH = $(window).height();
        wW = $(window).width();


        if (WHratio * wH > wW) {
            svg.css('width', 'auto');
            svgW = wW;
            totalSteps = s.isMobile()?11:10;
        }
        else {
            svg.css('width', WHratio * wH);
            svgW = WHratio * wH;
            totalSteps = 9;
        }

        svgH = svgW * SVGratio;

        svg.attr('width', svgW);
        svg.attr('height', svgH);


        /* to accomodate the copy panels */
        screenStep = (svgH + wH) / totalSteps;
        svg.css('marginTop', wH);

        s.refresh();
    }

    $(window).bind('resize', computeSize);
    computeSize();


    function scrollToBottom() {

        if (s.isMobile()) {
            s.setScrollTop(10000000000000000000);
            $('#toScroll').fadeTo(1000, 1);
        }
        else {
            $('html, body').stop().animate({ 'scrollTop': $(document).height() }, 50, 'linear', function () {
                $('#toScroll').fadeTo(1000, 1);
            });
        }

    }

    $(window).load(function () { scrollToBottom() })

});