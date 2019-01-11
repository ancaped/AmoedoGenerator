var dwn = document.getElementById('btndownload')
var fonteNormal, fonteItalico, fonteNegrito, fonteNegritoItalico
var corRetg, corHighL, corLogo

function setup() {

	createCanvas(600, 600);
	frameRate(100)

	fonteNormal = loadFont('FontFont_FF.Mark.Pro.Bold.otf');
	fonteItalico = loadFont('FontFont_FF.Mark.Pro.Bold.Italic.otf');
	fonteNegrito = loadFont('FontFont_FF.Mark.Pro.Black.otf');
	fonteNegritoItalico = loadFont('FontFont_FF.Mark.Pro.Black.Italic.otf');
		
	carregarImagem()
}

function carregarImagem(){
	img = loadImage(selectImage.value)
	imagem = selectImage.value

	logoOrig = loadImage("logo_ja.png")
	logoAncap= loadImage("logo_ancap.png")
	logoNovo = loadImage("logo_novo.png")
}

function draw(){

	// Define o esquema de cores da imagem
	switch (scheme.value){
		case "laranja":
			corRetg = "rgb(245,147,48)"
			corHighL= "rgb(225,110,40)"
			corLogo = "rgb(225,110,40)"
			break
		case "azul":
			corRetg = "rgb(0,73,114)"
			corHighL= "rgb(25,40,75)"
			corLogo = "rgb(245,147,48)"
			break
		case "ancap":
			corRetg = "rgb(240,220,0)"
			corHighL= "rgb(0,0,0)"
			corLogo = "rgb(0,0,0)"
			break
	}
	
	clear()
	background(220)

	// Carrega a imagem
	if(imagem != selectImage.value){carregarImagem()}
	image(img, 0, 0, canvas.width, canvas.height)

	// Desenhar retângulo
	if (retangulo.checked){
		noStroke() // remove as bordas do retângulo
		fill(corRetg) // define cor do retângulo

		if (lado.value == "esquerdo"){
			rect(0,0,canvas.width*largRetangulo.value/largRetangulo.max,canvas.height)
		}else{
			rect(canvas.width-canvas.width*largRetangulo.value/largRetangulo.max,0,canvas.width*largRetangulo.value/largRetangulo.max,canvas.height)
		}
	}

	// Desenha retangulo atrás do texto
	if (highlight.checked){
		var teste = texto.value;   
		var lines = teste.split("\n");
		var count = lines.length;
		//console.log(count);

		fill(corHighL)

		if(lado.value == "esquerdo"){
			for (i = 0 ; i < count; i++){
				noStroke()
				rect(22, canvas.height/2 + tamanho.value*(i - count/2 + 0.4), textWidth(lines[i])*1.03, tamanho.value*0.75)
			}
		}else{
			for (i = 0 ; i < count; i++){
				noStroke()
				rect(canvas.width - 22 - textWidth(lines[i])*1.03, canvas.height/2 + tamanho.value*(i - count/2 + 0.4), textWidth(lines[i])*1.03, tamanho.value*0.75)
			}
		}
	}

	// Escrever texto
	textSize(tamanho.value*1)
	textLeading(tamanho.value*1)

	// define estilo da fonte
	switch (fonte.value){
	case "normal":
		textFont(fonteNormal)
		break;
	case "italico":
		textFont(fonteItalico)
		break;
	case "negrito":
		textFont(fonteNegrito)
		break;
	case "negritoitalico":
		textFont(fonteNegritoItalico)
		break;
	}

	// define cor do texto
	if(branco.checked){fill(255)}else{fill(0)}
	
	// escreve o texto em si e o logotipo do João Amoedo e do Partido Novo

	if(logo_ancap.checked){logo = logoAncap}else{logo = logoOrig}

	if (lado.value == "esquerdo"){
		textAlign(LEFT, CENTER)
		text(texto.value, 25, canvas.height/2 )

		fill(corLogo)
		
		image(logo, canvas.width*largRetangulo.value/40-logo.width/4 - 60, canvas.height-30-logo.height/4 - 25, logo.width/1.75, logo.height/1.75)

		rect(canvas.width*largRetangulo.value/40-logo.width/4 + 50, canvas.height-25-logo.height/4 - 25, logo.width/2, logo.height/2)
		image(logoNovo, canvas.width*largRetangulo.value/40-logo.width/4 + 50, canvas.height-25-logo.height/4 - 25, logo.width/2, logo.height/2)
	}else{
		textAlign(RIGHT, CENTER)
		text(texto.value, canvas.width-25, canvas.height/2 )

		fill(corLogo)

		image(logo,canvas.width - canvas.width*largRetangulo.value/40 - logo.width/2 + 90, canvas.height-30-logo.height/4 - 25, logo.width/1.75, logo.height/1.75)

		rect(canvas.width - canvas.width*largRetangulo.value/40 - logo.width/4 - 50, canvas.height-25-logo.height/4 - 25, logo.width/2, logo.height/2)
		image(logoNovo,canvas.width - canvas.width*largRetangulo.value/40 - logo.width/4 - 50, canvas.height-25-logo.height/4 - 25, logo.width/2, logo.height/2)

	}
	
	// Função para download da imagem
	dwn.onclick = function(){
    	download(canvas, 'image.png');
	}

}

// Baixar imagem em formato png
function download(canvas, filename) {

  var lnk = document.createElement('a'), e;

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/png;base64");

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}