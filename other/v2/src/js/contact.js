function sendMail() {
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  window.open(`mailto:ko.watanabe.business.email@gmail.com?subject=${subject}&body=${message}`);
}
