int ThermistorPin = A0;
int adc;

float Rref = 10000;
float R1 = 10000;
float U = 5;

float a1 = 3.354016E-03;
float b1 = 2.569850E-04;
float c1 = 2.620131E-06;
float d1 = 6.383091E-08;

float adc_max = 1023;
float Umax = 5;

void setup() {
Serial.begin(9600);
}

void loop() {
   int adc = analogRead(ThermistorPin);

   float Untc = (Umax / adc_max)* adc;
   float Rntc = R1 * (Untc/(U-Untc));

   float logic = log(Rntc/Rref);
   float T = 1.0 /(a1 + b1*logic + c1*logic*logic + d1*logic*logic*logic);

   T = T - 273.15;
   Serial.println(T);
  delay(1000);
}





