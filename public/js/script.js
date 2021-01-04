/* טקסט באנגלית */
const errors = {
  name: "A valid name length is required",
  email: "A valid Email address length is required",
  phone: "A valid phone number is required",
  message: "Please enter at least 2 characters"
};

$("#contact-form").validate({
  rules: {
    name: { required: true, regexp: /[A-Za-z]{2,10}$/ },
    email: { required: true, email: true },
    phone: { required: true, regexp: /^0[2-9]\d{7,8}$/ },
    message: { required: true, minlength: 2, maxlength: 2000 },
  },
});

$.validator.addMethod("regexp", function (value, element, regexp) {
  $.validator.messages["regexp"] = errors[element.id];
  return new RegExp(regexp).test(value);
});

/* טקסט בעברית */
/* $('#contact-form').validate({
  rules: {
    name: { required: true, minlength: 2, maxlength: 70 },
    email: { required: true, email: true },
    phone: { required: true, regexp: /^0[2-9]\d{7,8}$/ },
    message: { required: true, minlength: 2, maxlength: 2000 }
  },
  messages: {
    name: {
      required: 'שדה זה הוא חובה',
      minlength: 'נא הכנס שתי אותיות לפחות',
      maxlength: 'הגזמת חביבי'
    },
    email: {
      required: 'שדה זה הוא חובה',
      email: 'אנא הכנס אימייל תקני'
    },
    phone: {
      required: 'שדה זה הוא חובה',
      regexp: 'נא הכנס מספר טלפון תקני בישראל',
      maxlength: 'הגזמת חביבי'
    },
    message: {
      required: 'שדה זה הוא חובה',
      minlength: 'נא הכנס שתי אותיות לפחות',
      maxlength: 'בשדה זה ניתן להכניס עד 2,000 תווים'
    }
  }
}); */