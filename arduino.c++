// Her opretter vi vores pin til værdien A0 
//hvilket er det den er puttet i på arduinoen
int ThermistorPin = A0;
// adc bruger vi til og lave en int der kan ændres senere
int adc;
// Dette er vores thermistorpin omh værdig
float Rref = 10000; // 10k
// Dette er vores modstander's omh værdig
float R1 = 10000; // 10k
// Her definere vi U til vores antal vol aka. 5 vol
float U = 5;
// Her laver vi en float det bliver brugt senere
float R;
// Disse 4 floats/variabler er vores thermistorpin's værdier
// Fået fra " Se kilde liste -> Vishay - NTC Thermistors - (Thermistor data) "
float a1 = 3.354016E-03;
float b1 = 2.569850E-04;
float c1 = 2.620131E-06;
float d1 = 6.383091E-08;
// Her definere vi vores max værdi på vores adc
float adc_max = 1023;
// Her definerer vi vores max antal vol hvilket er 5 vol
float Umax = 5;

// Her starter vi vores arduino op
void setup() {
Serial.begin(9600);
}

//Her er vores code som tager temperaturen 
void loop() {
//Starter med og ændre adc værdien til analogRead for og få
// information om hvilken pins der er i boarded
   int adc = analogRead(ThermistorPin);
// Her bruger vi vores matematiske viden for og få Untc værdig
   float Untc = (Umax / adc_max)* adc;
// Her bruger vi igen vores matematiske viden for og få Rntc
   float Rntc = R1 * (Untc/(U-Untc));
// Her definere vi logic til og formindske linjen under.
   float logic = log(Rntc/Rref);
// Her bruger vi vores viden vi fik fra 
// " Vishay - NTC Thermistors - (Thermistor data) -- Se i kildeliste"
   float T = 1.0 /(a1 + b1*logic + c1*logic*logic + d1*logic*logic*logic);
// Her definere vi vores output fra vores code ovenover og 
// minuser det med 273,15 for og få en temperatur i Celsius
   T = T - 273.15;
// Her returner vi vores T for temperatur i vores terminal
   Serial.println(T);

// Delay(1000) betyder den kun spytter ud ny temperatur/data hvert sekundt
  delay(1000);
}