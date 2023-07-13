<template>
  <div class="row containerParent">
    <label class="label-meet"> <b>Meet our team...</b> </label>
    <div class="row containerCard">
      <div class="col-md-12" v-for="customer in customers" :key="customer.id">
        <template v-if="customer.isActive">
          <div class="containerChild">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <h5 class="card-title">
                      <h1>
                        <b>{{ customer.firstName }} {{ customer.lastName }} </b>
                        <span class="type-pill">{{
                          getTypeNameById(customer.customerTypeId)
                        }}</span>
                      </h1>
                    </h5>
                  </div>
                  <div class="col-md-6">
                    <div class="action-container">
                      <button
                        class="btn btn-link edit-button"
                        @click="handleEdit(customer)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>

                      <button
                        class="btn btn-link delete-button"
                        @click="showDeleteConfirmation(customer.id)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="icon-wrapper">
                      <i class="fas fa-map-marker-alt icon-color"></i>
                      <span class="label-detail-address">{{
                        customer.address
                      }}</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="icon-wrapper">
                      <i class="fas fa-phone icon-color"></i>
                      <span class="label-detail">{{ customer.phone }}</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="icon-wrapper">
                      <i class="fas fa-calendar-alt icon-color"></i>
                      <span class="label-detail"
                        >{{ formatDate(customer.birthDate) }} (age
                        {{ customer.age }})</span
                      >
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="icon-wrapper">
                      <i class="fas fa-envelope icon-color"></i>
                      <span class="label-detail">{{ customer.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- Delete Confirmation Modal -->
      <div class="modal" :class="{ 'd-block': isDeleteConfirmationVisible }">
        <div class="modal-dialog  modal-sm">
            <div class="modal-content">
            <div class="modal-body text-center">
                <div class="modal-info-icon icon-color">
                <i class="fas fa-info-circle fa-3x"></i>
                </div>
                <div class="modal-text mt-4">
                <p class="mb-0"><h1>Do you want to delete this customer?</h1></p>
                </div>
                <div class="modal-buttons mt-4">
                
                <button class="btn btn-secondary mr-2 btn-no" @click="hideDeleteConfirmation">No</button>
                <button class="btn btn-danger mr-2 btn-yes" @click="confirmDelete">Yes</button>
                </div>
            </div>
            </div>
        </div>
</div>


    </div>
  </div>
</template>

<script>
export default {
  props: {
    customers: Array,
    customerTypes: Object,
  },
  data() {
    return {
      isDeleteConfirmationVisible: false,
      customerIdToDelete: null,
    };
  },
  methods: {
    handleEdit(customer) {
      // Emit an event to the parent component to indicate editing mode
      this.$emit("edit", customer);
    },
    showDeleteConfirmation(customerId) {
      this.isDeleteConfirmationVisible = true;
      this.customerIdToDelete = customerId;
    },
    hideDeleteConfirmation() {
      this.isDeleteConfirmationVisible = false;
      this.customerIdToDelete = null;
    },
    confirmDelete() {
      if (this.customerIdToDelete) {
        // Handle delete action and API request here
        this.$emit("delete", this.customerIdToDelete);
        this.hideDeleteConfirmation();
      }
    },
    getTypeNameById(id) {
      const type = this.customerTypes.find((type) => type.id === id);
      return type ? type.type : null;
    },
    formatDate(dateString) {
      const dateParts = dateString.split("-");
      const day = parseInt(dateParts[2]);
      const month = new Date(dateString).toLocaleString("default", {
        month: "long",
      });
      const year = dateParts[0];

      return `${day} ${month} ${year}`;
    },
  },
};
</script>
