// AzureOptionsHandler.ts

export class AzureOptionsHandler {

    public static handleAZBptions(config, storageOptions): object {
        if (config.fileLocation === 'azb' && config.connectionMethod === 'storage_options') {
            return {
                ...storageOptions, // Preserve any manually added storageOptions
                account_name : config.awsAccessKey,
                account_key: config.awsSecretKey,
            };
        }
        return storageOptions;
    }

    public static getAZBFields(): object[] {
        return [
          {
            type: "select",
            label: "Connection Method",
            id: "connectionMethod",
            options: [
              { value: "env", label: "Environment Variables (Recommended)", tooltip: "Use AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables, using an Env. Variable File is recommended." },
              { value: "storage_options", label: "Pass directly (storage_options)", tooltip: "You can pass credentials using the storage_options parameter. Using Environment Variables for this method is also recommended." }
            ],
            condition: { fileLocation: "azb" },
            connection: "Azure",
            ignoreConnection: true,
            advanced: true
          },
          {
            type: "input",
            label: "Storage Account",
            id: "awsAccessKey",
            placeholder: "Enter Access Key",
            inputType: "password",
            connection: "Azure",
            connectionVariableName: "AWS_ACCESS_KEY_ID",
            condition: { fileLocation: "azb", connectionMethod: "storage_options" },
            advanced: true
          },
          {
            type: "input",
            label: "Account key",
            id: "awsSecretKey",
            placeholder: "Enter Secret Key",
            inputType: "password",
            connection: "Azure",
            connectionVariableName: "AWS_SECRET_ACCESS_KEY",
            condition: { fileLocation: "azb", connectionMethod: "storage_options" },
            advanced: true
          },
        ];
      }
  }