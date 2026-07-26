<?php
/* ============================================================
   Contactformulier-handler — upscaleconsultancy.com
   Draait op de TransIP-webhosting (Webhosting Core, PHP).

   Wat dit script doet bij een aanvraag:
   1. Mailt de aanvraag (opgemaakt in huisstijl) naar info@.
      Reply-To = de klant, dus beantwoorden = de klant mailen.
   2. Mailt een bevestigingskopie (zelfde huisstijl) naar de klant.
   Er wordt niets opgeslagen; alles gaat direct via de
   TransIP-mailserver.

   Installatie:
   1. Upload dit bestand naar de webroot van de hosting, zodat het
      bereikbaar is op https://upscaleconsultancy.com/contact-handler.php
   2. Afzender is info@upscaleconsultancy.com; die mailbox bestaat al.
      TransIP-eis: het afzenderadres moet eindigen op de eigen
      domeinnaam (knowledgebase art. 7186).
   3. `sendmail_from` staat in het controlepaneel al op info@ (gedaan).
   ============================================================ */

declare(strict_types=1);

$TO   = "info@upscaleconsultancy.com";
$FROM = "info@upscaleconsultancy.com";
$FROM_NAME = "Upscale Consultancy";
$ALLOWED_ORIGINS = [
  "https://upscaleconsultancy.com",
  "https://www.upscaleconsultancy.com",
  "https://originalandawesome.github.io", // preview op GitHub Pages
];

/* ---------- request-afhandeling ---------- */

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
$originOk = in_array($origin, $ALLOWED_ORIGINS, true);
if ($originOk) {
  header("Access-Control-Allow-Origin: " . $origin);
  header("Vary: Origin");
}
header("Content-Type: application/json; charset=UTF-8");

if (($_SERVER["REQUEST_METHOD"] ?? "") === "OPTIONS") {
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  exit;
}
if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "method"]);
  exit;
}
/* Browsers sturen bij een fetch-POST altijd een Origin-header mee;
   een POST zonder geldige Origin komt dus niet van onze site. */
if (!$originOk) {
  http_response_code(403);
  echo json_encode(["ok" => false, "error" => "origin"]);
  exit;
}

$field = function (string $key, int $max = 500): string {
  $v = trim((string)($_POST[$key] ?? ""));
  $v = str_replace(["\r", "\n"], " ", $v); // geen headerinjectie
  return mb_substr($v, 0, $max);
};

/* Honeypot: onzichtbaar veld dat mensen leeg laten. Ingevuld = bot.
   We doen alsof het gelukt is, zodat de bot niets leert. */
if ($field("website") !== "") {
  echo json_encode(["ok" => true, "copy" => true]);
  exit;
}

$naam     = $field("naam", 120);
$telefoon = $field("telefoon", 40);
$email    = $field("email", 200);
$mutaties = $field("mutaties", 40);
$pakket   = $field("pakket", 80);
$en       = $field("taal", 5) === "en";
$bericht  = mb_substr(trim((string)($_POST["bericht"] ?? "")), 0, 4000);

if ($naam === "" || $telefoon === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "validation"]);
  exit;
}

/* ---------- opmaak (huisstijl: petrol / mint / amber) ---------- */

function e(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}

function rows_plain(array $rows): string {
  $out = [];
  foreach ($rows as [$label, $value]) $out[] = $label . ": " . $value;
  return implode("\n", $out);
}

function rows_html(array $rows): string {
  $out = "";
  foreach ($rows as [$label, $value]) {
    $out .=
      '<tr><td style="padding:11px 0;border-bottom:1px solid #DEE6E6">' .
      '<span style="display:block;font:600 11px Arial,Helvetica,sans-serif;color:#0E5560;letter-spacing:1.5px;text-transform:uppercase;padding-bottom:3px">' . e($label) . '</span>' .
      '<span style="font:15px/1.5 Arial,Helvetica,sans-serif;color:#141A1C">' . nl2br(e($value)) . '</span>' .
      '</td></tr>';
  }
  return $out;
}

function mail_html(string $title, string $intro, array $rows, string $outro, string $footer): string {
  return
'<!DOCTYPE html><html><body style="margin:0;padding:0;background-color:#F5F8F8">' .
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F8F8"><tr><td align="center" style="padding:36px 16px">' .
'<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px">' .
// kop: donker petrol paneel met merknaam
'<tr><td style="background-color:#072E34;border-radius:12px 12px 0 0;padding:24px 32px">' .
'<span style="font:700 19px Arial,Helvetica,sans-serif;color:#ffffff">Upscale</span> ' .
'<span style="font:400 19px Arial,Helvetica,sans-serif;color:#ffffff">Consultancy</span><br>' .
'<span style="font:600 10.5px Arial,Helvetica,sans-serif;color:#7FD1C0;letter-spacing:2.5px;text-transform:uppercase">Financial Services</span>' .
'</td></tr>' .
// amberkleurige accentlijn (het ene amber-detail uit de huisstijl)
'<tr><td style="height:3px;background-color:#A85E04;font-size:0;line-height:0">&nbsp;</td></tr>' .
// inhoud
'<tr><td style="background-color:#ffffff;border:1px solid #DEE6E6;border-top:0;padding:32px">' .
'<h1 style="font:700 21px Arial,Helvetica,sans-serif;color:#141A1C;margin:0 0 14px">' . e($title) . '</h1>' .
'<p style="font:15px/1.6 Arial,Helvetica,sans-serif;color:#3E4A4C;margin:0 0 22px">' . $intro . '</p>' .
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #DEE6E6">' . rows_html($rows) . '</table>' .
($outro !== "" ? '<p style="font:15px/1.6 Arial,Helvetica,sans-serif;color:#3E4A4C;margin:22px 0 0">' . $outro . '</p>' : '') .
'</td></tr>' .
// voet
'<tr><td style="background-color:#ffffff;border:1px solid #DEE6E6;border-top:1px solid #DEE6E6;border-radius:0 0 12px 12px;padding:18px 32px">' .
'<p style="font:12.5px/1.7 Arial,Helvetica,sans-serif;color:#5E6E71;margin:0">' . $footer . '</p>' .
'</td></tr>' .
'</table></td></tr></table></body></html>';
}

function send_mail(string $to, string $subject, string $plain, string $html, array $extraHeaders): bool {
  $boundary = "b" . bin2hex(random_bytes(12));
  $headers = array_merge([
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"" . $boundary . "\"",
  ], $extraHeaders);
  $body =
    "--" . $boundary . "\r\n" .
    "Content-Type: text/plain; charset=UTF-8\r\n" .
    "Content-Transfer-Encoding: 8bit\r\n\r\n" .
    $plain . "\r\n" .
    "--" . $boundary . "\r\n" .
    "Content-Type: text/html; charset=UTF-8\r\n" .
    "Content-Transfer-Encoding: 8bit\r\n\r\n" .
    $html . "\r\n" .
    "--" . $boundary . "--\r\n";
  return mail($to, mb_encode_mimeheader($subject, "UTF-8", "B"), $body, implode("\r\n", $headers));
}

/* ---------- inhoud opbouwen ---------- */

$mutLow = $mutaties === "" ? "" : mb_strtolower(mb_substr($mutaties, 0, 1)) . mb_substr($mutaties, 1);

if ($en) {
  $rows = [["Name", $naam], ["Phone", $telefoon], ["E-mail", $email]];
  if ($pakket !== "")  $rows[] = ["Package", $pakket];
  $rows[] = ["Bank transactions per month", $mutaties !== "" ? $mutaties : "unknown / not filled in"];
  if ($bericht !== "") $rows[] = ["Message", $bericht];

  $subjIntern = "Request via the website" . ($pakket !== "" ? ": " . $pakket : "") . " - " . $naam;
  $subjKlant  = "We've received your request";
  $titelIntern = "New request via the website";
  $introIntern = e($naam) . " would like to hear from us. Time to make a new client happy!";
  $titelKlant  = "Thanks for your request, " . $naam . "!";
  $introKlant  = "Your request has arrived safely. We'll contact you as soon as possible. Below is a copy of what you sent us, for your records.";
  $outroKlant  = "Want to add something in the meantime? Just reply to this e-mail, send a WhatsApp message or call us on 020 - 369 29 61. If we're on the phone, a WhatsApp message always gets through.";
  $footer = "Upscale Consultancy Financial Services B.V. &middot; Treubweg 13, 1112 BA Diemen<br>" .
            "020 - 369 29 61 (phone &amp; WhatsApp) &middot; info@upscaleconsultancy.com &middot; upscaleconsultancy.com";
} else {
  $rows = [["Naam", $naam], ["Telefoon", $telefoon], ["E-mail", $email]];
  if ($pakket !== "")  $rows[] = ["Pakket", $pakket];
  $rows[] = ["Bij-/afschrijvingen per maand", $mutaties !== "" ? $mutLow : "weet ik niet / niet ingevuld"];
  if ($bericht !== "") $rows[] = ["Bericht", $bericht];

  $subjIntern = "Aanvraag via de website" . ($pakket !== "" ? ": " . $pakket : "") . " - " . $naam;
  $subjKlant  = "We hebben je aanvraag ontvangen";
  $titelIntern = "Nieuwe aanvraag via de website";
  $introIntern = e($naam) . " wil graag van ons horen. Tijd om een nieuwe klant blij te maken!";
  $titelKlant  = "Bedankt voor je aanvraag, " . $naam . "!";
  $introKlant  = "Je aanvraag is goed bij ons binnengekomen. We nemen zo snel mogelijk contact met je op. Hieronder staat ter controle een kopie van wat je ons stuurde.";
  $outroKlant  = "Wil je ondertussen nog iets toevoegen? Beantwoord gewoon deze mail, stuur een WhatsApp bericht of bel ons op 020 - 369 29 61. Zijn we in gesprek? Een appje komt altijd aan.";
  $footer = "Upscale Consultancy Financial Services B.V. &middot; Treubweg 13, 1112 BA Diemen<br>" .
            "020 - 369 29 61 (telefoon &amp; WhatsApp) &middot; info@upscaleconsultancy.com &middot; upscaleconsultancy.com";
}

/* 1. interne notificatie — beantwoorden = de klant mailen */
$plainIntern = $titelIntern . "\n\n" . rows_plain($rows) . "\n";
$htmlIntern  = mail_html($titelIntern, $introIntern, $rows, "", $footer);
$okIntern = send_mail($TO, $subjIntern, $plainIntern, $htmlIntern, [
  "From: " . $FROM_NAME . " website <" . $FROM . ">",
  "Reply-To: " . $naam . " <" . $email . ">",
]);

/* 2. bevestigingskopie naar de klant */
$plainKlant = $titelKlant . "\n\n" . strip_tags($introKlant) . "\n\n" . rows_plain($rows) . "\n\n" . strip_tags($outroKlant) . "\n";
$htmlKlant  = mail_html($titelKlant, e($introKlant), $rows, e($outroKlant), $footer);
$okKlant = $okIntern && send_mail($email, $subjKlant, $plainKlant, $htmlKlant, [
  "From: " . $FROM_NAME . " <" . $FROM . ">",
  "Reply-To: " . $FROM_NAME . " <" . $TO . ">",
]);

if (!$okIntern) http_response_code(502);
echo json_encode(["ok" => $okIntern, "copy" => $okKlant]);
