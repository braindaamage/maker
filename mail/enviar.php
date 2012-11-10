<?php 
require("class.phpmailer.php");


function comprobar_email($email){ 
   	$mail_correcto = 0; 
   	//compruebo unas cosas primeras 
   	if ((strlen($email) >= 6) && (substr_count($email,"@") == 1) && (substr($email,0,1) != "@") && (substr($email,strlen($email)-1,1) != "@")){ 
      	 if ((!strstr($email,"'")) && (!strstr($email,"\"")) && (!strstr($email,"\\")) && (!strstr($email,"\$")) && (!strstr($email," "))) { 
         	 //miro si tiene caracter . 
         	 if (substr_count($email,".")>= 1){ 
            	 //obtengo la terminacion del dominio 
            	 $term_dom = substr(strrchr ($email, '.'),1); 
            	 //compruebo que la terminación del dominio sea correcta 
            	 if (strlen($term_dom)>1 && strlen($term_dom)<5 && (!strstr($term_dom,"@")) ){ 
               	 //compruebo que lo de antes del dominio sea correcto 
               	 $antes_dom = substr($email,0,strlen($email) - strlen($term_dom) - 1); 
               	 $caracter_ult = substr($antes_dom,strlen($antes_dom)-1,1); 
               	 if ($caracter_ult != "@" && $caracter_ult != "."){ 
                  	 $mail_correcto = 1; 
               	 } 
            	 } 
         	 } 
      	 } 
   	} 
   	if ($mail_correcto) 
      	 return 1; 
   	else 
      	 return 0; 
}


$enviar = true;
$resultado = Array();
$resultado['status'] = 0;

if ($_POST['nombre'] == "") {
	$enviar = false;
	$resultado['error'] = "Favor ingresa los campos obligatorios";
}

if ($_POST['email'] == "") {
	$enviar = false;
	$resultado['error'] = "Favor ingresa los campos obligatorios";
} else if (comprobar_email($_POST['email']) == 0) {
	$enviar = false;
	$resultado['error'] = "Ingresa un E-mail valido";
}

if ($_POST['mensaje'] == "") {
	$enviar = false;
	$resultado['error'] = "Favor ingresa los campos obligatorios";
}


if ($_POST['captcha'] == "") {
	$enviar = false;
	$resultado['error'] = "Favor ingresa el código de seguridad";
} else {
	session_start();
	if ($_POST['captcha'] != $_SESSION['tmptxt']) {
		$enviar = false;
		$resultado['error'] = "Código de seguridad incorrecto";
		$resultado['captcha1'] = $_POST['captcha'];
		$resultado['captcha2'] = $_SESSION['tmptxt'];
	} else {
		session_destroy();
	}
}


if ($enviar) {
	$mail = new PHPMailer();
	$mail->IsSMTP(); // telling the class to use SMTP
	$mail->SMTPAuth      = true;                  // enable SMTP authentication
	$mail->SMTPSecure 	 = "ssl";
	$mail->Host          = "smtp.gmail.com"; // sets the SMTP server
	$mail->Port          = 465;                    // set the SMTP port for the GMAIL server
	$mail->Username      = "contacto@maker.cl"; // SMTP account username
	$mail->Password      = "a1contactob2maker";        // SMTP account password

	$mail->From = "contacto@maker.cl";
	$mail->FromName = "Contacto";
	$mail->Subject = "Contacto via web";
	$mail->AddAddress("contacto@maker.cl");
	$body = "<strong>Contacto</strong><br><br>";
	$body .="Nombre: " . $_POST['nombre'] . "<br>";
	$body .="E-mail: " . $_POST['email'] . "<br>";
	$body .="Fono: " . $_POST['fono'] . "<br>";
	$body .="Asunto: " . $_POST['asunto'] . "<br>";
	$body .="Mensaje: " . $_POST['mensaje'] . "<br>";
	$mail->Body = $body;
	$mail->IsHTML(true);
	$mail->Send();
	
	} else {
	$resultado['status'] = 1;
}

echo json_encode($resultado);

?>