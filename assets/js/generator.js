
var dwn = null;
var colorpicker = null;
var fonteNormal, fonteItalico, fonteNegrito, fonteNegritoItalico;
var corRetg, corHighL, corLogo;
var atualizacao = false; // esqueceu do ';' rsrsrs...
var fileUpload= null ;

var context;

var escolheuCor = false;

$(function () {
	dwn = document.getElementById('btndownload');
	colorpicker = document.getElementById('colorpicker');
	context = canvas.getContext("2d");
	fileUpload = document.getElementById('fileUpload');

	fileUpload.addEventListener("change", atualiza, false);

	// onclik's 
	colorpicker.onclick = function () {
		escolheuCor = true;
	};

	scheme.onclick = function () {
		escolheuCor = false;
	};
});




function setup() {
	createCanvas(600,600);
	frameRate(100);

	fonteNormal = loadFont('./assets/fontes/Normal.otf');
	fonteItalico = loadFont('./assets/fontes/Italico.otf');
	fonteNegrito = loadFont('./assets/fontes/Negrito.otf');
	fonteNegritoItalico = loadFont('./assets/fontes/NegritoItalico.otf');

	carregarImagem();
}

function carregarImagem() {
	img = loadImage("./assets/imagens/" + selectImage.value)
	imagem = selectImage.value;

	logoAncap = loadImage("logo_ancap.png")
	logoAncapB = loadImage("logo_ancap_branco.png")
	logoNovo = loadImage("logo_novo.png")
}

// Upload de imagens

function atualiza() { atualizacao = true }


function draw() {

	if (escolheuCor) {
		var hexcolor = colorpicker.value.split('#')[1];
		red_value = parseInt(hexcolor.slice(0, 2), 16);
		green_value = parseInt(hexcolor.slice(2, 4), 16);
		blue_value = parseInt(hexcolor.slice(4, 6), 16);

		// aqui eu adaptei pra continuar funcionando
		// seu código lá debaixo
		corRetg = "rgb(" + red_value + "," + green_value + "," + blue_value + ")";
		corHighL = "rgb(" + red_value + "," + green_value + "," + blue_value + ")";
		corLogo = "rgb(" + red_value + "," + green_value + "," + blue_value + ")";
	} else {
		// Define o esquema de cores da imagem
		switch (scheme.value) {
			case "laranja":
				corRetg = "rgb(245,147,48)"; // esqueceu de novo...
				corHighL = "rgb(225,110,40)";
				corLogo = "rgb(225,110,40)";
				break;
			case "azul":
				corRetg = "rgb(0,73,114)";
				corHighL = "rgb(25,40,75)";
				corLogo = "rgb(245,147,48)";
				break;
			case "ancap":
				corRetg = "rgb(240,220,0)";
				corHighL = "rgb(0,0,0)";
				corLogo = "rgb(0,0,0)";
				break;
		}
	}

	clear();
	background(220);

	// Carrega a imagem
	if (custom.checked) {

		if (atualizacao == true) {

			if (fileUpload.files && fileUpload.files[0]) {
				var FR = new FileReader();
				FR.onload = function (e) {
					var img2 = new Image();
					img2.addEventListener("load", function () {
						//context.drawImage(img, 0, 0)
						console.log(img2);

						img = createImage(img2.width, img2.height);
						img.drawingContext.drawImage(img2, 0, 0);
						console.log(img);
					});
					img2.src = e.target.result;
				};
				FR.readAsDataURL(fileUpload.files[0]);
			}

			atualizacao = false;
		}

	} else {
		if (imagem != selectImage.value) {
			carregarImagem();
		}
	}

	// inverte a imagem se a opção estiver marcada
	if (inverter.checked) {
		push()
		scale(-1, 1)
		image(img, -canvas.width, 0, canvas.width, canvas.height)
		pop()
	} else {
		image(img, 0, 0, canvas.width, canvas.height)
	}

	// Desenhar retângulo
	if (retangulo.checked) {
		noStroke() // remove as bordas do retângulo
		fill(corRetg) // define cor do retângulo

		if (lado.value == "esquerdo") {
			rect(0, 0, canvas.width * largRetangulo.value / largRetangulo.max, canvas.height)
		} else {
			rect(canvas.width - canvas.width * largRetangulo.value / largRetangulo.max, 0, canvas.width * largRetangulo.value / largRetangulo.max, canvas.height)
		}
	}

	// Desenha retangulo atrás do texto
	if (highlight.checked) {
		var teste = texto.value;
		var lines = teste.split("\n");
		var count = lines.length;
		//console.log(count);

		fill(corHighL)

		if (lado.value == "esquerdo") {
			for (i = 0; i < count; i++) {
				noStroke()
				rect(22, canvas.height / 2 + tamanho.value * (i - count / 2 + 0.4), textWidth(lines[i]) * 1.03, tamanho.value * 0.75)
			}
		} else {
			for (i = 0; i < count; i++) {
				noStroke()
				rect(canvas.width - 22 - textWidth(lines[i]) * 1.03, canvas.height / 2 + tamanho.value * (i - count / 2 + 0.4), textWidth(lines[i]) * 1.03, tamanho.value * 0.75)
			}
		}
	}

	// Escrever texto
	textSize(tamanho.value * 1)
	textLeading(tamanho.value * 1)

	// define estilo da fonte
	switch (fonte.value) {
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
	if (branco.checked) { fill(255) } else { fill(0) }

	// escreve o texto em si e o logotipo do João Amoedo e do Partido Novo

	if (logo_ancap.checked) {

		if (scheme.value == "ancap" && retangulo.checked) { logo = logoAncapB } else { logo = logoAncap }

	} else { logo = logoOrig }

	if (lado.value == "esquerdo") {
		textAlign(LEFT, CENTER)
		text(texto.value, 25, canvas.height / 2)

		fill(corLogo)

		image(logo, canvas.width * largRetangulo.value / 40 - logo.width / 4 - 60, canvas.height - 30 - logo.height / 4 - 25, logo.width / 1.75, logo.height / 1.75)

		noStroke()
		rect(canvas.width * largRetangulo.value / 40 - logo.width / 4 + 50, canvas.height - 25 - logo.height / 4 - 25, logo.width / 2, logo.height / 2)
		image(logoNovo, canvas.width * largRetangulo.value / 40 - logo.width / 4 + 50, canvas.height - 25 - logo.height / 4 - 25, logo.width / 2, logo.height / 2)
	} else {
		textAlign(RIGHT, CENTER)
		text(texto.value, canvas.width - 25, canvas.height / 2)

		fill(corLogo)

		image(logo, canvas.width - canvas.width * largRetangulo.value / 40 - logo.width / 2 + 90, canvas.height - 30 - logo.height / 4 - 25, logo.width / 1.75, logo.height / 1.75)

		noStroke()
		rect(canvas.width - canvas.width * largRetangulo.value / 40 - logo.width / 4 - 50, canvas.height - 25 - logo.height / 4 - 25, logo.width / 2, logo.height / 2)
		image(logoNovo, canvas.width - canvas.width * largRetangulo.value / 40 - logo.width / 4 - 50, canvas.height - 25 - logo.height / 4 - 25, logo.width / 2, logo.height / 2)

	}

	// Função para download da imagem
	dwn.onclick = function () {
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
