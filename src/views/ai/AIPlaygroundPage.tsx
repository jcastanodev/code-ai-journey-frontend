import { AIPlayground } from "@components/ai/AIPlayground";
import { BaseLayout } from "@layouts/BaseLayout";

export function AIPlaygroundPage() {
    return (
        <BaseLayout className="container px-2 pt-0 mx-auto mt-0">
            <div className="p-2 text-center rounded-none bg-primary">
                <h1>AI Playground</h1>
            </div>
            <AIPlayground />
        </BaseLayout>
    );
}
