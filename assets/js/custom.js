$(".set-link").on("click", function (e) {
  e.preventDefault();

  let linkHref = $(this).prop("href");
  let navClick = $(this).data("link") || $(this).parent().data("link");
  localStorage.setItem("navActive", navClick);
  window.location.replace(linkHref);
});

navActive = localStorage.getItem("navActive")
  ? localStorage.getItem("navActive")
  : "dashboard";
console.log(navActive);

$(".set-link")
  .parent("[data-link='" + navActive + "']")
  .addClass("active");
$(".set-link[data-link='" + navActive + "']")
  .addClass("active")
  .closest("div.collapse")
  .addClass("show")
  .closest(".nav-item")
  .addClass("active");

let userData = JSON.parse(localStorage.getItem("userData"));
$(".nameUser").text(
  userData.fullname.charAt(0).toUpperCase() +
    userData.fullname.slice(1).toLowerCase()
);
