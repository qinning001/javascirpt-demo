const hasId = document.querySelector("#diagram");
hasId ||
  document.head.insertAdjacentHTML(
    "beforeend",
    `
  <style>
    td select,
    td input {
      width: 150px;
    }

    #diagram td {
      vertical-align: bottom;
      text-align: center;
      padding: 10px;
    }

    #diagram div {
      margin: auto;
    }
</style>
`
  );

hasId ||
  document.body.insertAdjacentHTML(
    "beforeend",
    `
<form name="calculator">
  <table>
    <tr>
      <td>Initial deposit</td>
      <td>
        <input name="money" type="number" value="10000" required>
      </td>
    </tr>
    <tr>
      <td>How many months?</td>
      <td>
        <select name="months">
          <option value="3">3 (minimum)</option>
          <option value="6">6 (half-year)</option>
          <option value="12" selected>12 (one year)</option>
          <option value="18">18 (1.5 years)</option>
          <option value="24">24 (2 years)</option>
          <option value="30">30 (2.5 years)</option>
          <option value="36">36 (3 years)</option>
          <option value="60">60 (5   years)</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>Interest per year?</td>
      <td>
        <input name="interest" type="number" value="5" required>
      </td>
    </tr>
  </table>
</form>


<table id="diagram">
  <tr>
    <th>Was:</th>
    <th>Becomes:</th>
  </tr>
  <tr>
    <th id="money-before"></th>
    <th id="money-after"></th>
  </tr>
  <td>
    <div style="background: red;width:40px;height:100px"></div>
  </td>
  <td>
    <div style="background: green;width:40px;height:0" id="height-after"></div>
  </td>
</table>
`
  );

let form = document.forms.calculator;

form.money.oninput = calculate;
form.months.onchange = calculate;
form.interest.oninput = calculate;

function calculate() {
  let initial = +form.money.value;
  if (!initial) return;

  let interest = form.interest.value * 0.01;
  if (!interest) return;

  let years = form.months.value / 12;
  if (!years) return;

  let result = Math.round(initial * (1 + interest * years));

  let height = (result / form.money.value) * 100 + "px";
  document.getElementById("height-after").style.height = height;
  document.getElementById("money-before").innerHTML = form.money.value;
  document.getElementById("money-after").innerHTML = result;
}

export default () => {
  calculate();
};
