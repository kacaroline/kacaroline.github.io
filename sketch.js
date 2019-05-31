/* 
    Equipe: 
        Kauana Caroline Neves de Araújo - Subturma D (Líder)
        Raffael Morais Dutra - Subturma C 
        Etapa 1, 2, 3 & 4
*/

//variáveis responsável pelo objeto
var px=200, py=0, gravity=0.7, fy=0, pulo = -12, pvida = 5
//variáveis relacionadas ao disparo
var ty, tx, vel = 15, disparo = false, conLado=1
//variáveis responsáveis pelo inimigo
var ix = 650 ,iy = 350 , ivida = 5
//variavel de pontuação
pont=0
//variavel da tela
tela=1



function preload(){
  //importa os sons
somtiro = loadSound("disparo.flac")
sompdie= loadSound("player_die.wav")
somidie= loadSound("enemy_die.wav")
somhit= loadSound("hit.wav")
pla= loadImage("plat.jpg")
}


function setup() {
  createCanvas(600, 400);
  
  //seta um volume
  somtiro.setVolume(2.0);
  sompdie.setVolume(5.0);
  somidie.setVolume(0.6);
  somhit.setVolume(0.2);
  
  
}
function draw() {
 if(tela==1){ 
   background(0);
    textSize(32); 
    fill(135,206,235);
    text("Jogo de Plataforma", 150, 200);
    if (keyIsDown(ENTER) ) {
       tela = 2;  
    } 
 }
  
  if(tela==2){
   
  rectMode(CENTER)
  background(pla);
  fill('white')
  textSize(18)
  text('Vidas: '+parseInt(pvida),10,30)
  text('Pontos: '+pont,250,30)
  text('Nível 1',520,30)
  //Ref Player --
  if (keyIsDown(LEFT_ARROW)) {
    px = px - 10;
    conLado = -1
    if(px<-15){
      px=615
    }
  }
  if(keyIsDown(27)){
    tela=4
  }
  if (keyIsDown(RIGHT_ARROW)) {
    px = px + 10;
    conLado = 1
    if(px>615){
      px=0
    }
  }
  fy = fy + gravity
  py = fy + py
  
  if(py >= 350){
    py = 350
    fy = 0
  }
  ellipse(px,py,40,40)
  // --
  // Ref Disparo --
  if(disparo == true){
     ellipse(tx,ty,10,10)
     tx = tx + vel
     if(tx >= 600 || tx<=0){
       vel = 15
       disparo = false 
     }
  }
  // --
  // Ref inimigo --
  
  rect(ix, iy, 40,40)
  ix = ix - 2
  if(ix <= -50){
   ix = 650 
  }
  if(dist(tx,ty,ix,iy) < 30){
    if(disparo ==true){
      pont=pont+10
      ivida = ivida - 1
      vel = 15
      disparo = false
    }  
  }
  if(dist(px,py,ix,iy) < 40){
      somhit.play()
      pvida= pvida-0.2
    
        }
  
  
  if(dist(px,py,ix,iy) < 40){
    if(py < (iy-30) && fy > 0){
      ivida = 0
    }
  }
  if(ivida == 0){
    somidie.play()
    pont=pont+50
    ix = 650 
    ivida = 5
  }
    if(pvida==0||pvida<0){
      sompdie.play()
      tela=3
    }
  

 }
  if(tela==3){
  background(0);
    textSize(32); 
    fill(135,206,235);
    text("GAME OVER", 200, 200); 
    textSize(20); 
    fill(135,206,235);
    text("Quer tentar novamente?", 195, 250);
    textSize(20); 
    fill(135,206,235);
    text("Sim(1)", 197, 300);
    textSize(20); 
    fill(135,206,235);
    text("Não(0)", 353, 300);
    if(keyIsDown(49)){
      tela=2
      pvida= 5
      ivida= 5
      px=200
      py=0
    }
    if(keyIsDown(48)){
      tela=1
      pvida= 5
      ivida= 5
      px=200
      py=0
    }
 }
  if(tela==4){
    background(0);
    textSize(32); 
    fill(135,206,235);
    text("Pause", 150, 200);
    if (keyIsDown(ENTER) ) {
       tela = 2;  
    }
  }
}
   //if(pvida==0||pvida<0){
    //sompdie.play
    
   // px= 200
   //py=0
  // pvida= 5

function keyPressed(){
  if(keyCode === UP_ARROW){
    if(py == 350){
      fy = fy + pulo
    }
  }
  
  if(keyCode === CONTROL){  
    if(disparo == false){
      somtiro.play()
      disparo = true
      tx = px + 40 * conLado
      ty = py
      vel = vel * conLado
    }
  }
}