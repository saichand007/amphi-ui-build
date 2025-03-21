import { codeIcon } from '../../icons';
import { BaseCoreComponent } from '../BaseCoreComponent';// Adjust the import path

export class CustomTransformations extends BaseCoreComponent {
  constructor() {
    const defaultConfig = { code: "output = input" };
    const form = {
      idPrefix: "component__form",
      fields: [
        {
          type: "info",
          label: "Instructions",
          id: "instructions",
          text: "Write Python code with 'input' being the input dataframe, and 'output' the output dataframe.",
        },
        {
          type: "codeTextarea",
          label: "Imports",
          id: "imports",
          placeholder: "import pandas as pd",
          height: '50px',
          advanced: true
        },
        {
          type: "codeTextarea",
          label: "Code",
          tooltip: "Use the dataframe 'input' as input and 'output' output. For example, output = input would return the same data as input.",
          id: "code",
          mode: "python",
          height: '300px',
          placeholder: "output = input",
          advanced: true
        }
      ],
    };
    const description = "Use custom Python code to apply Pandas operations on the input DataFrame, transforming it to produce the desired output DataFrame. You can also use this component as either an input or an output.";

    super("Python Transforms", "customTransformations", description, "pandas_df_processor", [], "transforms", codeIcon, defaultConfig, form);
  }

  public provideImports({config}): string[] {
    const imports: string[] = [];
  
    // Always include 'import pandas as pd'
    imports.push("import pandas as pd");
  
    // Check if `config.imports` is a valid string
    if (config.imports) {
      // Split by lines and trim each line to handle whitespace issues
      const importLines = config.imports
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('import ') || line.startsWith('from '));
  
      // Add the valid import lines to the imports array
      imports.push(...importLines);
    }
  
    return imports;
  }

  public generateComponentCode({ config, inputName, outputName }): string {
    let code = `\n${config.code}`.replace(/input/g, inputName);
    code = code.replace(/output/g, outputName);
    return code;
  }
}