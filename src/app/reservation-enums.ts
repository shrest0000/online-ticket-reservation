export enum ReservationEnums {

  BACKENDAUTHURL = 'http://localhost:8080/authenticate',
  GETMOVIESURL = 'http://localhost:8080/movies',
  RESERVATIONURL = 'http://localhost:8080/reserve',
  GETRESERVATIONBYID = 'http://localhost:8080/reserve/',
  PAYMENTURL ="http://localhost:8080/payment/",

  ROUTELOGIN = 'login',
  ROUTEDASHBOARD = '/omtr',
  ROUTERESERVATION = '/omtr/reservation',
  ROUTEPAYMENT = '/omtr/payment',

  GETALLRESERVATIONS = 'http://localhost:8080/get-all-reservations/',
  GETALLPAYMENTS = 'http://localhost:8080/get-all-payments/',

  // for admins
  DELETERESERVATIONS = '',
  EDITRESERVATIONS = '',

}

Object.freeze(ReservationEnums)
