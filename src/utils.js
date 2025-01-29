const travelApplicationSections = [
  {
    title: "Personal Information",
    fields: [
      { label: "Country of Application", key: "countryOfApplication" },
      { label: "Surname", key: "surname" },
      { label: "First Name", key: "firstName" },
      { label: "Middle Name", key: "middleName" },
      { label: "Gender", key: "gender" },
      { label: "Marital Status", key: "maritalStatus" },
      { label: "Date of Birth", key: "dateOfBirth" },
      { label: "Place of Birth", key: "placeOfBirth" },
      { label: "Country of Origin", key: "countryOfOrigin" },
      { label: "Other Nationality", key: "otherNationality" },
      { label: "Permanent Resident Country", key: "permanentResidentCountry" },
      { label: "National ID Number", key: "nationalIdNumber" },
      { label: "Home Address", key: "homeAddress" },
      { label: "City", key: "city" },
      { label: "State/Province", key: "stateProvince" },
      { label: "Postal Code", key: "postalCode" },
      { label: "Country", key: "country" },
      { label: "Primary Phone Number", key: "primaryPhoneNumber" },
      { label: "Secondary Phone Number", key: "secondaryPhoneNumber" },
      { label: "Work Phone Number", key: "workPhoneNumber" },
      { label: "Email Address", key: "emailAddress" },
      { label: "Passport Type", key: "passportType" },
      { label: "Passport Number", key: "passportNumber" },
      { label: "Passport Booklet Count", key: "passportBookletCount" },
      { label: "Passport Issuing Country", key: "passportIssuingCountry" },
      { label: "Passport Issuing City", key: "passportIssuingCity" },
      {
        label: "Passport Issuing State/Province",
        key: "passportIssuingStateProvince",
      },
      {
        label: "Passport Issuing Country Region",
        key: "passportIssuingCountryRegion",
      },
      { label: "Passport Issuance Date", key: "passportIssuanceDate" },
      { label: "Passport Expiration Date", key: "passportExpirationDate" },
      { label: "Lost or Stolen Passport", key: "lostOrStolenPassport" },
    ],
  },

  {
    title: "Travel Information",
    fields: [
      { label: "Intended Country of Visit", key: "intendedCountryOfVisit" },
      { label: "Purpose of Trip", key: "purposeOfTrip" },
      { label: "Intended Date of Arrival", key: "intendedDateOfArrival" },
      { label: "Intended Length of Stay", key: "intendedLengthOfStay" },
      { label: "Address During Stay", key: "addressDuringStay" },
      { label: "City", key: "addressCity" },
      { label: "State/Province", key: "addressStateProvince" },
      { label: "Postal Code", key: "addressPostalCode" },
      { label: "Trip Payer", key: "tripPayer" },
      { label: "Traveling Companions", key: "travelingCompanions" },
      { label: "Previous Travel Abroad", key: "previousTravelAbroad" },
      { label: "Previous Visa Issued", key: "previousVisaIssued" },
      { label: "Visa Refusal Details", key: "visaRefusalDetails" },
    ],
  },

  {
    title: "Contact Information",
    fields: [
      { label: "Contact Person Name", key: "contactPersonName" },
      { label: "Contact Organization", key: "contactOrganization" },
      { label: "Contact Relationship", key: "contactRelationship" },
      { label: "Contact Address", key: "contactAddress" },
      { label: "Contact Phone Number", key: "contactPhoneNumber" },
      { label: "Contact Email Address", key: "contactEmailAddress" },
    ],
  },

  {
    title: "Family Information",
    fields: [
      { label: "Father Surname", key: "fatherSurname" },
      { label: "Father Given Names", key: "fatherGivenNames" },
      { label: "Father Date of Birth", key: "fatherDateOfBirth" },
      { label: "Father in Visit Country", key: "fatherInVisitCountry" },
      { label: "Mother Surname", key: "motherSurname" },
      { label: "Mother Given Names", key: "motherGivenNames" },
      { label: "Mother Date of Birth", key: "motherDateOfBirth" },
      { label: "Mother in Visit Country", key: "motherInVisitCountry" },
      {
        label: "Immediate Relatives in Visit Country",
        key: "immediateRelativesInVisitCountry",
      },
      { label: "Relative Name", key: "relativeName" },
      { label: "Relative Relationship", key: "relativeRelationship" },
      { label: "Relative Marital Status", key: "relativeMaritalStatus" },
    ],
  },

  {
    title: "Work/Education/Training Information",
    fields: [
      {
        label: "Current Employer/School Name",
        key: "currentEmployerOrSchoolName",
      },
      { label: "Address", key: "currentEmployerOrSchoolAddress" },
      { label: "City", key: "currentEmployerOrSchoolCity" },
      { label: "State/Province", key: "currentEmployerOrSchoolStateProvince" },
      { label: "Postal Code", key: "currentEmployerOrSchoolPostalCode" },
      { label: "Phone Number", key: "currentEmployerOrSchoolPhoneNumber" },
      { label: "Monthly Salary", key: "monthlySalary" },
      { label: "Job Duties Description", key: "jobDutiesDescription" },
      { label: "Previously Employed", key: "previouslyEmployed" },
      { label: "Education Above Secondary", key: "educationAboveSecondary" },
      {
        label: "Educational Institution Name",
        key: "educationalInstitutionName",
      },
      { label: "Address", key: "educationalInstitutionAddress" },
      { label: "City", key: "educationalInstitutionCity" },
      { label: "State/Province", key: "educationalInstitutionStateProvince" },
      { label: "Country", key: "educationalInstitutionCountry" },
      { label: "Course of Study", key: "courseOfStudy" },
      { label: "Date of Attendance Start", key: "dateOfAttendanceStart" },
      { label: "Date of Attendance End", key: "dateOfAttendanceEnd" },
      {
        label: "Other Institutions Attended",
        key: "otherInstitutionsAttended",
      },
      { label: "Clan/Tribe", key: "clanOrTribe" },
      { label: "Languages Spoken", key: "languagesSpoken" },
      {
        label: "Travel History Last 5 Years",
        key: "travelHistoryLastFiveYears",
      },
      { label: "Professional Organizations", key: "professionalOrganizations" },
    ],
  },

  {
    title: "Attachments",
    fields: [
      { label: "Visa Application", key: "visaApplication" },
      { label: "Scanned Passport", key: "scannedPassport" },
      {
        label: "Visa Terms and Conditions",
        key: "visaTermsAndConditionsDocument",
      },
    ],
  },
];

const studentApplicationSections = [
  {
    title: "Personal Information",
    fields: [
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Other Name", key: "otherName" },
      { label: "Passport Number", key: "passportNumber" },
      { label: "Race", key: "race" },
      { label: "Date of Birth", key: "dateOfBirth" },
      { label: "Place of Birth", key: "placeOfBirth" },
      { label: "Nationality", key: "nationality" },
      { label: "Religion", key: "religion" },
      { label: "Marital Status", key: "maritalStatus" },
      { label: "Gender", key: "gender" },
      { label: "Current Address", key: "currentAddress" },
      { label: "Telephone Number", key: "telephoneNumber" },
      { label: "Email Address", key: "emailAddress" },
      { label: "Postal Code", key: "postalCode" },
      { label: "State/Province", key: "stateProvince" },
      { label: "City", key: "city" },
    ],
  },
  {
    title: "Father's Information",
    fields: [
      { label: "Father's First Name", key: "parentInfoFatherFirstName" },
      { label: "Father's Last Name", key: "parentInfoFatherLastName" },
      { label: "Father's Phone Number", key: "parentInfoFatherPhoneNumber" },
      { label: "Father's Email Address", key: "parentInfoFatherEmailAddress" },
      { label: "Father's Occupation", key: "parentInfoFatherOccupation" },
    ],
  },
  {
    title: "Mother's Information",
    fields: [
      { label: "Mother's First Name", key: "parentInfoMotherFirstName" },
      { label: "Mother's Last Name", key: "parentInfoMotherLastName" },
      { label: "Mother's Phone Number", key: "parentInfoMotherPhoneNumber" },
      { label: "Mother's Email Address", key: "parentInfoMotherEmailAddress" },
      { label: "Mother's Occupation", key: "parentInfoMotherOccupation" },
    ],
  },
  {
    title: "Emergency Contact Details",
    fields: [
      {
        label: "Emergency Contact First Name",
        key: "emergencyContactFirstName",
      },
      { label: "Emergency Contact Last Name", key: "emergencyContactLastName" },
      {
        label: "Emergency Contact Relationship",
        key: "emergencyContactRelationship",
      },
      {
        label: "Emergency Contact Phone Number",
        key: "emergencyContactPhoneNumber",
      },
      {
        label: "Emergency Contact Email Address",
        key: "emergencyContactEmailAddress",
      },
      {
        label: "Emergency Contact Occupation",
        key: "emergencyContactOccupation",
      },
    ],
  },
  {
    title: "Additional Information",
    fields: [
      {
        label: "Do you have an English Certificate?",
        key: "hasEnglishCertificate",
      },
      { label: "How did you know about us?", key: "howDidYouKnowAboutUs" },
      { label: "Full Name of Agent (if applicable)", key: "fullNameOfAgent" },
      { label: "If Other, Please Explain", key: "ifOtherExplain" },
      {
        label: "Will accommodation be provided?",
        key: "accommodationProvided",
      },
      {
        label: "Do you have a disability or medical condition?",
        key: "hasDisabilityOrMedicalCondition",
      },
      {
        label: "Name of Disability or Medical Condition (if applicable)",
        key: "nameOfDisabilityOrMedicalCondition",
      },
    ],
  },
  // {
  //   title: "Declaration",
  //   fields: [
  //     // Declaration section is currently commented out in the interface
  //     // Uncomment and include if needed later:
  //     // { label: "Applicant's Signature and Date", key: "applicantSignatureAndDate" },
  //     // { label: "Parent/Guardian's Signature and Date", key: "parentGuardianSignatureAndDate" },
  //   ],
  // },
];

function generateApplicationHTML(data, applicationSections) {
  return `
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-8">${
        data.firstName
      }'s Travel Application Details</h1>
      
      ${applicationSections
        .map(
          (section) => `
        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">${section.title}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            ${section.fields
              .map((field) => {
                const value = data[field.key];
                return `
                <div>
                  <p>
                    <strong class="text-gray-500">${field.label}:</strong>
                    ${Array.isArray(value) ? value.join(", ") : value || "NIL"}
                  </p>
                </div>
              `;
              })
              .join("")}
          </div>
        </section>
      `
        )
        .join("")}
    </div>
  `;
}

module.exports = {
  generateApplicationHTML,
  travelApplicationSections,
  studentApplicationSections,
};
