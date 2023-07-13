<template>
  <div>
    <div class="row">
      <div class="col-md-6 my-column label-large"><b>DEV.</b>test</div>
      <div class="col-md-6 my-column">
        <button class="transparent-button">
          <span class="label">John Doe</span>
          <i class="fas fa-user"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <CustomerForm
          :customer="selectedCustomer"
          :customerTypes="customerTypes"
          :isEditing="isEditing"
          @form-submitted="handleSubmit"
        />
      </div>
      <div class="col-md-6">
        <CustomerList
          :customers="customers"
          :customerTypes="customerTypes"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/style/styles.css";
</style>

<script>
import CustomerForm from "@/components/CustomerForm.vue";
import CustomerList from "@/components/CustomerList.vue";
import axios from "axios";

export default {
  components: {
    CustomerForm,
    CustomerList,
  },
  data() {
    return {
      customers: [],
      selectedCustomer: {
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        age: "",
        birthDate: "",
        customerTypeId: "",
      },
      customerTypes: [],
      isEditing: false,
    };
  },
  mounted() {
    // Fetch initial data from APIs and populate customers
    this.fetchCustomers();
    this.fetchCustomerTypes();
  },
  methods: {
    fetchCustomers() {
      axios
        .get("https://devtest.e1-vhp.com/customer")
        .then((response) => {
          this.customers = response.data.data.map((customer) => {
            return {
              ...customer,
              firstName: customer["first-name"], // Rename 'first-name' to 'firstName'
              lastName: customer["last-name"],
              birthDate: customer["birth-date"],
              customerTypeId: customer["tb_customertype_id"],
              isActive: customer["is-active"],
            };
          });
          console.log(this.customers);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchCustomerTypes() {
      axios
        .get("https://devtest.e1-vhp.com/customertype")
        .then((response) => {
          const customerTypes = response.data.data;
          this.customerTypes = customerTypes.filter(
            (type) => type["is-active"]
          );
          console.log(this.customerTypes);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleEdit(customer) {
      this.selectedCustomer = { ...customer };
      this.isEditing = true;
    },
    handleSubmit(customerData) {
      console.log(customerData);
      if (this.isEditing) {
        // Update existing customer
        axios
          .put(
            "https://devtest.e1-vhp.com/customer",
            JSON.stringify(customerData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Customer updated successfully:", response.data);
            this.resetForm();
            this.fetchCustomers();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Add new customer
        axios
          .post(
            "https://devtest.e1-vhp.com/customer",
            JSON.stringify(customerData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("New customer added successfully:", response.data);
            this.resetForm();
            this.fetchCustomers();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    handleDelete(customerId) {
      axios
        .delete(`https://devtest.e1-vhp.com/customer/${customerId}`)
        .then((response) => {
          console.log("Customer deleted successfully:", response.data);
          this.fetchCustomers();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resetForm() {
      this.selectedCustomer = {
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        age: "",
        birthDate: "",
        userType: "",
      };
      this.isEditing = false;
    },
  },
};
</script>
