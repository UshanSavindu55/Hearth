import React from 'react';
import { Label, Input, Card } from '../components/common';

const LabelDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Label Component Demo
          </h1>
          <p className="text-slate-400 text-lg">
            Showcase of all Label component variants and usage examples
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Size Variants */}
          <Card className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Size Variants</h2>
            <div className="space-y-4">
              <div>
                <Label size="xs" htmlFor="input-xs">Extra Small Label</Label>
                <Input id="input-xs" placeholder="Extra small input" className="mt-1" />
              </div>
              <div>
                <Label size="sm" htmlFor="input-sm">Small Label</Label>
                <Input id="input-sm" placeholder="Small input" className="mt-1" />
              </div>
              <div>
                <Label size="md" htmlFor="input-md">Medium Label (Default)</Label>
                <Input id="input-md" placeholder="Medium input" className="mt-1" />
              </div>
              <div>
                <Label size="lg" htmlFor="input-lg">Large Label</Label>
                <Input id="input-lg" placeholder="Large input" className="mt-1" />
              </div>
              <div>
                <Label size="xl" htmlFor="input-xl">Extra Large Label</Label>
                <Input id="input-xl" placeholder="Extra large input" className="mt-1" />
              </div>
            </div>
          </Card>

          {/* Color Variants */}
          <Card className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Color Variants</h2>
            <div className="space-y-4">
              <div>
                <Label variant="default" htmlFor="input-default">Default Label</Label>
                <Input id="input-default" placeholder="Default styling" className="mt-1" />
              </div>
              <div>
                <Label variant="light" htmlFor="input-light">Light Label</Label>
                <Input id="input-light" placeholder="Light styling" className="mt-1" />
              </div>
              <div>
                <Label variant="muted" htmlFor="input-muted">Muted Label</Label>
                <Input id="input-muted" placeholder="Muted styling" className="mt-1" />
              </div>
              <div>
                <Label variant="accent" htmlFor="input-accent">Accent Label</Label>
                <Input id="input-accent" placeholder="Accent styling" className="mt-1" />
              </div>
              <div>
                <Label variant="success" htmlFor="input-success">Success Label</Label>
                <Input id="input-success" placeholder="Success styling" className="mt-1" />
              </div>
              <div>
                <Label variant="warning" htmlFor="input-warning">Warning Label</Label>
                <Input id="input-warning" placeholder="Warning styling" className="mt-1" />
              </div>
              <div>
                <Label variant="error" htmlFor="input-error">Error Label</Label>
                <Input id="input-error" placeholder="Error styling" className="mt-1" />
              </div>
            </div>
          </Card>

          {/* Required Labels */}
          <Card className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Required Fields</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="required-1" required>Required Field</Label>
                <Input id="required-1" placeholder="This field is required" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="required-2" required variant="accent">Required Accent Label</Label>
                <Input id="required-2" placeholder="Required with accent color" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="required-3" required variant="error">Required Error Label</Label>
                <Input id="required-3" placeholder="Required with error color" className="mt-1" />
              </div>
            </div>
          </Card>

          {/* Disabled Labels */}
          <Card className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Disabled States</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="disabled-1" disabled>Disabled Label</Label>
                <Input id="disabled-1" placeholder="Disabled input" disabled className="mt-1" />
              </div>
              <div>
                <Label htmlFor="disabled-2" disabled required>Disabled Required Label</Label>
                <Input id="disabled-2" placeholder="Disabled required input" disabled className="mt-1" />
              </div>
            </div>
          </Card>
        </div>

        {/* Usage Examples */}
        <Card className="mt-8 p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Examples</h2>
          <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
            <pre className="text-slate-300 text-sm overflow-x-auto">
{`// Basic usage
<Label htmlFor="email">Email Address</Label>

// With required indicator
<Label htmlFor="password" required>Password</Label>

// Different sizes and variants
<Label size="lg" variant="accent" htmlFor="username">Username</Label>

// Disabled state
<Label htmlFor="disabled-field" disabled>Disabled Field</Label>

// Custom styling
<Label htmlFor="custom" className="custom-class">Custom Label</Label>`}
            </pre>
          </div>
          <p className="text-slate-400 text-sm">
            The Label component supports all these props: <code className="text-indigo-300">children</code>, 
            <code className="text-indigo-300"> htmlFor</code>, <code className="text-indigo-300">required</code>, 
            <code className="text-indigo-300"> size</code>, <code className="text-indigo-300">variant</code>, 
            <code className="text-indigo-300"> className</code>, <code className="text-indigo-300">disabled</code>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LabelDemo;
