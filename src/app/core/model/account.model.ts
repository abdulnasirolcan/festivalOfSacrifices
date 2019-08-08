export class Account {
  id?: string;
  rowNumber?: number; //sıra no
  earringsNumber?: number; //küpe no
  animalWeight?: string; // ağırlık
  relatedPerson?: string; // ilgili kişi
  phoneNumber?: string; // tlf numarası
  cuttingOrder?: string; // kesim sırası
  cuttingTime?: string; // kesim saati
  numberOfShares?: number; //hisse adedi
  appointmentTime?: Date | string; //randevü saati
  paymentReceived?: Date | string; // ödeme alındı
  cutReceived?: Date | string; // kesim yapıldı
  cutReceivedTotal?: Date | string; // kesim sayfasındaki toplam ödeme yapıldı
  containerDelivered?: Date | string; // konteynır çıkışı yapıldı
  shareTentEntry?: Date | string; // hisse çadırına giriş yapıldı
  paymentReceivedTotal?: Date | string; // muhasebe sayfasındaki toplam ödeme alındı
}
