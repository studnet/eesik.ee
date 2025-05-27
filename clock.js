(function () {

    /*
    The Hilfiker/MobaTime Swiss Railway Clock
    1953 version (Stop To Go)
    Step and bounce on all hands
    CSS3 Animation
    kurt.grigg@yahoo.co.uk
    */

    /* ^^^^^^^^^^^^^^ Config below ^^^^^^^^^^^^^^ */

    var clockSize = 400;
    var caseColour = 'rgba(200,200,200,1.0)';
    var caseShadow = 'rgba(0,0,0,0.5)';
    var dialColour = 'rgba(255,255,255,1.0)';
    var sechandColour = 'rgba(173,26,20,1.0)';
    var handColour = 'rgb(30,30,40)';
    var markColour = 'rgb(20,20,30)';
    var reflection = 'https://s21.postimg.org/wnuv62bh3/reflection.png';
    var clockShape = 50;
        /* (max) 50 = round  (min) 0 = square */

    /* ^^^^^^^^^^^^^^^^ End config ^^^^^^^^^^^^^^ */

    var mls = 100;
    var secSpan = '.5s';
    var minSpan = '.3s';
    var houSpan = '.3s';
    var secIncr = 0;
    var minIncr = 0;
    var houIncr = 0;
    var d = document;
    var broff = (clockShape < 20) ? 2 : 0;
    var rndId = 'id'+Math.random() * 1;
    var idx = d.getElementsByTagName('div').length;
    var secDeg, minDeg, houDeg, preMin, preHou;
    var rnd = 'id'+Math.random() * 1;
    var dum = '';
    var vb = '<svg height="'+xy(100)+'" width="'+xy(100)+'" viewBox="0 0 200 200">';

    var now = new Date(); 
    var mobasec = Math.ceil(Math.min(60, (now.getSeconds() * 1.025)));
    var mobacycle = 975;   
    var tmr, mobaTimer; 

    var eiatf = 'translateZ(0); animation-timing-function: ease-in';
    var eoatf = 'translateZ(0); animation-timing-function: ease-out';
    d.write('<div id = "'+rnd+'" style="display:inline-block;line-height:0px;"></div>');

    function xy (v) {
        return (v * clockSize / 100);
    }

    function genShadKillClone(c, v, x, y) {
        c.style.left = xy(x)+'px';
        c.style.top = xy(y)+'px';
        c.style.zIndex--;   
        var s = 'filter="url(#handShadow)"';
        var r = v.split('filter="url()"').join("");
        r = r.replace(/""/g, s);
        c.innerHTML = r;
    }

    /* Clock case and dial */

    var outerRim = d.createElement('div');
    outerRim.setAttribute('style', 'display:inline-block;'
        +'position: relative;'
        +'height: '+xy(116)+'px;'
        +'width: '+xy(116)+'px;'
        +'background-image: linear-gradient(to left, '
        +'rgba(0,0,0,0.3) 0%, '
        +'rgba(255,255,255,0.6) 50%, '
        +'rgba(0,0,0,0.3) 100%);'
        +'background-color: '+caseColour+';'
        +'border: '+xy(1)+'px solid transparent;' 
        +'box-shadow: 0 0 '+xy(0.5)+'px '+xy(0.05)+'px rgba(255,255,255,0.7), '
        +'0 '+xy(7)+'px '+xy(5)+'px -'+xy(1)+'px '+caseShadow+';'
        +'border-radius: '+clockShape+'%;'
        +'overflow: hidden;');

    var innerRim = d.createElement('div');
    innerRim.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(113.8)+'px;'
        +'width: '+xy(113.8)+'px;'
        +'background-color: '+dialColour+';'
        +'margin: auto; top: 0;bottom: 0;left: 0;right: 0;' 
        +'box-shadow: inset 0 0 0 '+xy(2.9)+'px rgba(30,30,30,0.3),'
        +'inset 0 '+xy(3)+'px '+xy(5)+'px '+xy(3)+'px rgba(0,0,0,0.6),'
        +'0 0 '+xy(0.5)+'px '+xy(0.2)+'px rgba(200,200,200,0.5);'
        +'border-radius: '+clockShape+'%;');

    var dial = d.createElement('div');
    dial.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(100)+'px;'
        +'width: '+xy(100)+'px;'
        +'margin: auto; top: 0; bottom: 0;left: 0;right: 0;' 
        +'border-radius: '+clockShape+'%;'
        +'overflow: hidden;');

    /* Clock markers  */
    var face = '<svg id="Moba'+idx+'" xmlns="http://www.w3.org/2000/svg"'+ 
        'viewBox="0 0 200 200" width="100%" height="100%">'+
        '<defs>'+
        '<clipPath id="dialPath">'+
         '<circle cx="100" cy="100" r="100"/>'+
        '</clipPath>'+
        '<filter id="handShadow" color-interpolation-filters="sRGB">'+
         '<feFlood result="flood" flood-color="#000" flood-opacity="0.25"/>'+
         '<feComposite result="composite1" operator="in" in2="SourceGraphic" in="flood"/>'+
         '<feGaussianBlur result="blur" stdDeviation="0.5" in="composite1"/>'+
         '<feOffset result="offset" dy="0" dx="0"/>'+
         '<feComposite result="composite2" operator="atop" in2="offset" in="offset"/>'+
        '</filter>'+
        '</defs>'+
        '</svg>';

    d.getElementById(rnd).appendChild(outerRim);
    outerRim.appendChild(innerRim);
    innerRim.appendChild(dial);
    dial.innerHTML = face;

    for (var i = 0; i < 60; i++) {
        var mrkrLength = (i % 5) ? 7.5 : 25;
        var mrkrWidth = (i % 5) ? 3 : 7.5;

        var mrkrs = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        with(mrkrs) {
            setAttribute('x1', '100');
            setAttribute('y1', '0');
            setAttribute('x2', '100');
            setAttribute('y2', mrkrLength);
            setAttribute('stroke', markColour);
            setAttribute('stroke-width', mrkrWidth);
            setAttribute('stroke-linecap', 'butt');
            setAttribute("clip-path", "url(#dialPath)");
            setAttribute( "transform","rotate("+i * 6+", 100, 100)");
        }
        d.getElementById('Moba'+idx).appendChild(mrkrs);
    }

    var logo = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200" shape-rendering="geometricPrecision"><g transform="scale(1.0)"><path d="M100.03 80.056c-3.783-.007-7.57 1.29-10.61 3.897-5.273 4.526-6.826 11.85-4.17 17.962l3.977-2.884c-1.32-4.016-.146-8.512 3.294-11.465 4.357-3.738 10.926-3.654 15.178.193 3.27 2.957 4.353 7.32 3.094 11.223l3.98 2.887c2.56-5.96 1.152-13.087-3.88-17.64-3.015-2.727-6.84-4.12-10.682-4.17h-.18z" color="#000" fill="#666"/><path d="M70.898 114.637l-.898 5.34h1.156l.56-3.34L73.233 120h.129l1.52-3.363.558 3.34H76.6l-.9-5.34h-1.163l-1.238 2.734-1.234-2.733h-1.165zm11.75 0c-1.512 0-2.746 1.207-2.746 2.683 0 1.478 1.234 2.68 2.746 2.68s2.743-1.202 2.743-2.68c0-1.476-1.23-2.683-2.742-2.683zm6.805 0V120H91.7v-.012a1.493 1.518 0 0 0 .155.012 1.493 1.518 0 0 0 1.493-1.52 1.493 1.518 0 0 0-.922-1.402 1.416 1.375 0 0 0 .527-1.066 1.416 1.375 0 0 0-1.254-1.367v-.008h-2.247zm9.65 0L97.022 120h1.293l.3-.816 2.286.007.3.81h1.236l-2.032-5.363h-1.304zm7.784 0l-.12.617h1.315l-.75 4.746h.684l.738-4.746h1.36l.113-.617h-3.34zm6.996 0l-.848 5.363h.68l.85-5.363h-.682zm5.433 0l-1.95 5.363h.708l1.133-3.46.973 3.46 2.11-3.46.038 3.46h.71l-.268-5.363-2.38 3.984-1.074-3.983zm7.8 0l-.84 5.363h2.818l.11-.617h-2.263l.345-2.012h2.145l.12-.612h-2.16l.235-1.504h2.203l.172-.617h-2.883zm-36.432 1.027h.62a.535.59 0 0 1 .524.59.535.59 0 0 1-.523.59h-.622v-1.18zm-8.036.18c.81 0 1.477.667 1.477 1.476 0 .81-.667 1.477-1.477 1.477s-1.48-.667-1.48-1.477.67-1.476 1.48-1.476zm17.118.273l.773 2.09h-1.556l.782-2.09zm-9.082 1.598H91.504a.706.656 0 0 1 .687.656.706.656 0 0 1-.686.653v.004H90.684v-1.312z" fill="#4d4d4d"/><path d="M90.268 102.305l-.602.445v6.297l.602-.523v-6.22zm19.464 0v6.22l.602.522v-6.297l-.602-.445zm-18.523.574v6.42c.19.225.393.435.6.63v-6.21c-.216-.273-.418-.535-.6-.84zm17.58 0c-.182.305-.384.567-.6.84v6.21c.207-.195.41-.405.6-.63v-6.42zm-20.07.573l-.597.442v6.175l.598-.523v-6.094zm22.56 0v6.094l.597.523v-6.175l-.598-.442zm-18.528.973v5.992c.195.15.397.292.602.422v-5.777c-.208-.2-.41-.41-.602-.637zm14.496 0c-.192.226-.394.437-.602.637v5.777c.205-.13.407-.27.602-.422v-5.992zm-20.07.172l-.598.44v6.056l.598-.524v-5.972zm25.644 0v5.972l.598.524v-6.055l-.598-.442zm-18.523.97v5.6c.196.103.394.196.596.28V106c-.204-.134-.402-.277-.597-.433zm11.4 0c-.194.155-.392.298-.596.432v5.45c.202-.086.4-.18.597-.282v-5.6zm-20.065.17l-.598.446v5.933l.598-.527v-5.852zm28.73 0v5.852l.598.527v-5.933l-.598-.446zm-18.523.602v5.324c.198.067.396.128.597.18v-5.215c-.204-.087-.4-.184-.598-.29zm8.316 0c-.197.106-.394.203-.597.29v5.214c.202-.052.4-.113.598-.18v-5.324zm-6.773.5v5.13c.2.036.4.066.6.09v-5.056c-.2-.045-.402-.1-.6-.164zm5.23 0c-.198.064-.4.12-.6.164v5.055c.2-.024.4-.054.6-.09v-5.13zm-18.523.043l-.602.445v4.79h.602v-5.235zm31.816 0v5.234h.602v-4.79l-.602-.444zm-16.98.22v5.003c.2.01.4.013.6.01v-4.963c-.2-.007-.4-.025-.6-.05zm2.144 0c-.2.025-.4.042-.6.05v4.964c.2.002.4-.002.6-.01V107.1zm-18.523.925l-.603.445v3.644h.602v-4.09zm34.9 0v4.09h.603v-3.645l-.602-.445zm-36.444 1.144l-.602.445v2.5h.602v-2.945zm37.988 0v2.945h.602v-2.5l-.602-.445zm-39.535 1.145l-.6.44v1.36h.6v-1.8zm41.08 0v1.8h.6v-1.36l-.6-.44zm-42.624 1.144l-.887.657h.886v-.656zm44.168 0v.657h.887l-.886-.656z"/></g></svg>';

	/* LOGO SVG TEKSTIGA ASENDAMISEKS NAIDE W3Schoolist
	
	<svg height="130" width="500">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="70" rx="85" ry="55" fill="url(#grad1)" />
  <text fill="#ffffff" font-size="45" font-family="Verdana" x="50" y="86">SVG</text>
  Sorry, your browser does not support inline SVG.
</svg>

ALLPOOL TASUKS MUUTA LOGO KORGUS real
      +'top: '+xy(48)+'px;'
	  NAITEKS
	        +'top: '+xy(75)+'px;'
			
	Siis oleks kahesonaline logo oiges kohas
*/

    var mtl = d.createElement('div');
    mtl.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(50)+'px;'
        +'top: '+xy(48)+'px;'
        +'margin: auto; left: 0;right: 0;');
    mtl.innerHTML = logo;
    dial.appendChild(mtl);

    /* Generic container for all hands */

    var handContainers = 'display: block;'
        +'position: absolute;'
        +'height: '+xy(100)+'px;'
        +'width: '+xy(100)+'px;'
        +'font-size: 0px; line-height: 0px; padding: 0;'
        +'margin: auto; top: 0;bottom: 0; left: 0; right: 0;'
        +'transform-origin: center center;'

    /* Hour hand */

    var houClone = handContainers;
    var houContainer = d.createElement('div');
    houContainer.setAttribute('style', houClone);
    houContainer.style.zIndex = 50;
    dial.appendChild(houContainer);
    var houHand = d.createElement('div');
    var housvg = vb +
    '<polygon points="95,33 105,33 106,125 94,125" fill="'+handColour+'" stroke="none" "'+dum+'" />'+
    '</svg>';
    houHand.innerHTML = housvg;
    houContainer.appendChild(houHand);
    var houShad = houContainer.cloneNode(true);
    dial.appendChild(houShad);
    genShadKillClone(houShad,housvg, 0, 3);

    /* Minute hand */

    var minClone = handContainers;
    var minContainer = d.createElement('div');
    minContainer.setAttribute('style',minClone);
    minContainer.style.zIndex = 52;
    dial.appendChild(minContainer);
    var minHand = d.createElement('div');
    var minsvg =  vb +
    '<polygon points="96,5 104,5 105,125 95,125" fill="'+handColour+'" stroke="none" "'+dum+'" />'+
    '</svg>';
    minHand.innerHTML = minsvg;
    minContainer.appendChild(minHand);
    var minShad = minContainer.cloneNode(true);
    dial.appendChild(minShad);
    genShadKillClone(minShad,minsvg, 0, 4);

    /* Seconds hand */

    var secClone = handContainers;
    var secContainer = d.createElement('div');
    secContainer.setAttribute('style',secClone);
    secContainer.style.zIndex = 54;
    dial.appendChild(secContainer);
    var secHand = d.createElement('div');
    var secsvg =  vb +
    '<path d="M100 23.475a10 10 0 0 0-10 10 10 10 0 0 0 8.22 9.832V135h3.56V43.31a10 10 0 0 0 8.22-9.835 10 10 0 0 0-10-10z" fill="'+sechandColour+'" "'+dum+'" />'+
    '</svg>';
    secHand.innerHTML = secsvg;
    secContainer.appendChild(secHand);
    var secShad = secContainer.cloneNode(true);
    dial.appendChild(secShad);
    genShadKillClone(secShad,secsvg, 0, 5);

    /* Clock glass */

    var glass = d.createElement('div');
    glass.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(112)+'px;'
        +'width: '+xy(112)+'px;'
        +'margin: auto; top: 0; bottom: 0; left: 0;right: 0;' 
        +'border-radius: '+(clockShape - broff)+'%;'
        +'background-image: url("'+reflection+'");'
        +'background-size: cover;'
        +'box-shadow: inset 0 0 '+xy(0.5)+'px '+xy(0.5)+'px rgba(0,0,0,1);'
        +'opacity: 0.3;'
        +'z-index: 105;'
        +'overflow: hidden;');
    innerRim.appendChild(glass);

    function secKeyFrames() {
        var secSheet = (d.getElementById('tmpSecSheet'+idx));
        if (secSheet) {
            secSheet.parentNode.removeChild(secSheet);
        }
        secClone = handContainers;
        var p1 = secDeg;
        var p2 = secDeg+6;
        var p3 = secDeg+4.8;
        var p4 = secDeg+6;
        var p5 = secDeg+5.5; 
        var p6 = secDeg+6; 
        var secframes = '@keyframes s'+idx+'gen'+secIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'40% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'55% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'70% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'80% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'90%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';  
        var ss = document.createElement( 'style' );
        ss.setAttribute('id', 'tmpSecSheet'+idx);
        ss.innerHTML = secframes;
        document.getElementsByTagName('head')[0].appendChild(ss);
        var secAni = 'animation: s'+idx+'gen'+secIncr+' '+secSpan+' 1 forwards;';
        secClone += secAni;
        secHand.setAttribute('style', secClone);
        secHand.style.zIndex = 104;
        dial.appendChild(secHand);
        secShad.setAttribute('style', secClone);
        secShad.style.top = xy(5)+'px';
        secShad.style.left = xy(0)+'px';
    }

    function minKeyFrames() {
        var minSheet = (d.getElementById('tmpMinSheet'+idx));
        if (minSheet) {
            minSheet.parentNode.removeChild(minSheet);
        }
        minClone = handContainers;
        var p1 = minDeg;
        var p2 = minDeg+6;
        var p3 = minDeg+4;
        var p4 = minDeg+6;
        var p5 = minDeg+5; 
        var p6 = minDeg+6;
        var minframes = '@keyframes m'+idx+'gen'+minIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'30% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'45% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'60% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'70% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'80%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';
        var ms = document.createElement( 'style' );
        ms.setAttribute('id', 'tmpMinSheet'+idx);
        ms.innerHTML = minframes;
        d.getElementsByTagName('head')[0].appendChild(ms);
        var minAni = 'animation: m'+idx+'gen'+minIncr+' '+minSpan+' 1 forwards;';
        minClone += minAni;
        minHand.setAttribute('style', minClone);
        minHand.style.zIndex = 102;
        dial.appendChild(minHand);
        minShad.setAttribute('style', minClone);
        minShad.style.top = xy(4)+'px';
        minShad.style.left = xy(0)+'px';
    }

    function houKeyFrames() {
        var houSheet = (d.getElementById('tmphouSheet'+idx));
        if (houSheet) {
            houSheet.parentNode.removeChild(houSheet);
        }
        houClone = handContainers;
        var p1 = houDeg;
        var p2 = houDeg+1;
        var p3 = houDeg+0.4;
        var p4 = houDeg+1;
        var p5 = houDeg+0.5; 
        var p6 = houDeg+1; 
        var houframes = '@keyframes h'+idx+'gen'+houIncr+' { '
        +'0% { transform: rotate('+p1+'deg) '+eiatf+';}'
        +'30% { transform: rotate('+p2+'deg) '+eoatf+';}'
        +'45% { transform: rotate('+p3+'deg) '+eiatf+';}'
        +'60% { transform: rotate('+p4+'deg) '+eoatf+';}' 
        +'70% { transform: rotate('+p5+'deg) '+eiatf+';}'
        +'80%,100% { transform: rotate('+p6+'deg) '+eoatf+';}}';
        var hs = document.createElement( 'style' );
        hs.setAttribute('id', 'tmphouSheet'+idx);
        hs.innerHTML = houframes;
        d.getElementsByTagName('head')[0].appendChild(hs);
        var houAni = 'animation: h'+idx+'gen'+houIncr+' '+houSpan+' 1 forwards;';
        houClone += houAni;
        houHand.setAttribute('style', houClone);
        houHand.style.zIndex = 100;
        dial.appendChild(houHand);
        houShad.setAttribute('style', houClone);
        houShad.style.top = xy(3)+'px';
        houShad.style.left = xy(0)+'px';
     }

    function mobaSeconds() {
        mobasec++;
        secIncr++;
        secDeg = (mobasec-1) * 6;
        secHand.removeAttribute('style');
        secKeyFrames();
        if (secIncr > 59) {
            secIncr = 0;
        }
        mobaTimer = setTimeout(mobaSeconds, mobacycle);
        if (mobasec > 59) {
            clearTimeout(mobaTimer);
            mobasec = 0;
            firstrun = false;
        }
    }

    function clock() {
        var x = new Date();

        var minutes = x.getMinutes();
        var hours = (x.getHours() * 30) + (x.getMinutes() / 2);

        if (minutes !== preMin) {
            mobaSeconds();
            minIncr++;
            minDeg = (minutes-1) * 6;
            minHand.removeAttribute('style');
            minKeyFrames();
            if (minIncr > 59) {
                minIncr = 0;
            }
        }

        if (hours !== preHou) {
            houIncr++;
            houDeg = (hours-1) * 1;
            houHand.removeAttribute('style');
            houKeyFrames();
            if (houIncr > 59) {
                houIncr = 0;
            }
        }

        preMin = minutes;
        preHou = hours;

        tmr = setTimeout(clock, mls);
    }

    window.addEventListener('load', clock, false);
})();